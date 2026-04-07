const FPS = 60;
const BACKCOLOR = "#181a1b";
const FRONTCOLOR = "#00FF00";
const LINEWIDHT = 3;

let canvas = undefined;
let ctx = undefined;
let width = undefined;
let height = undefined;

let rot = {x: 0, y: 0, z: 0};

function point({x, y}, {w, h}) {
    ctx.fillStyle = FRONTCOLOR;
    ctx.fillRect(x-(w*0.5), y-(h*0.5), w, h);
}

function line(p1, p2) {
    ctx.lineWidth = LINEWIDHT;
    ctx.strokeStyle = FRONTCOLOR;

    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

function clearFrameBuffer() {
    ctx.fillStyle = BACKCOLOR;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = FRONTCOLOR;
}

function screen({x, y, z}) {
    // Projection
    const xp = (x/z), yp = (y/z);

    return {
        x: (xp + 1.0)/2.0*width,
        y: (1.0 - (yp + 1.0)/2.0)*height,
    };
}

function translate(pos, dpos) {
    return {
        x: pos.x + dpos.x,
        y: pos.y + dpos.y,
        z: pos.z + dpos.z,
    };
}

function rotateXZ({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: (x*c) - (z*s),
        y: y,
        z: (x*s) + (z*c),
    };
}

function rotateXY({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: (x*c) - (y*s),
        y: (x*s) + (y*c),
        z: z,
    };
}

function rotateZY({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x,
        y: (z*s) - (y*c),
        z: (z*c) + (y*s),
    };
}

function rotateAbs(pos, rot) {
    let t = pos;

    if (rot.x) t = rotateZY(t, rot.x);
    if (rot.y) t = rotateXZ(t, rot.y);
    if (rot.z) t = rotateXY(t, rot.z);

    return t;
}

function render(vt, ft) {
    clearFrameBuffer();

    for (const f of ft) {
        const v0 = vt[f[0]];
        const v1 = vt[f[1]];
        const v2 = vt[f[2]];

        const p0 = screen({x: v0[0], y: v0[1], z: v0[2]});
        const p1 = screen({x: v1[0], y: v1[1], z: v1[2]});
        const p2 = screen({x: v2[0], y: v2[1], z: v2[2]});

        line(p0, p1);
        line(p1, p2);
        line(p2, p0);
    }
}

function setup() {
    canvas = document.getElementById("canv");
    ctx = canvas.getContext("2d");

    width = canvas.width;
    height = canvas.height;

    ctx.fillStyle = FRONTCOLOR;
    ctx.lineWidth = LINEWIDHT;
    ctx.strokeStyle = FRONTCOLOR;

    console.debug(ctx);
    setTimeout(frame, 1000/FPS);
}

function frame() {
    const dt = 1/FPS;

    rot.y += (Math.PI*dt)*0.25;
    // rot.x += (Math.PI*dt)*0.25;
    // rot.z += (Math.PI*dt)*0.25;
    
    let vt = [];

    // Rotating

    for (const v of verts) {
        let t = rotateAbs({x: v[0], y: v[1], z: v[2]}, rot);
        t = translate(t, {x: 0, y: 0, z: 1});

        vt.push([ t.x, t.y, t.z ]);
    }

    // Rendering
    render(vt, faces);

    setTimeout(frame, 1000/FPS);
}

// TODO: Filling.
