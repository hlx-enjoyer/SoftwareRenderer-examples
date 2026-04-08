// import { verts, faces } from 'cubeModelF4.js';

const FPS = 60;
const BACKCOLOR = "#181a1b";
const FRONTCOLOR = "#00FF00";
const LINEWIDHT = 3;

let canvas = undefined;
let ctx = undefined;
let width = undefined;
let height = undefined;

// LA GAME - START

let rot = {x: 0, y: 0, z: 0};
let pos = {x: 0, y: 0, z: 1};
let keystates = {
    a: false, d: false, w: false, s: false, r: false, f: false,
    left: false, right: false, up: false, down: false, lt: false, gt: false,
};

// LA GAME - END

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
        if ((f.length % 4) == 0) { // Draw quads
            const p0 = screen({x: vt[f[0]][0], y: vt[f[0]][1], z: vt[f[0]][2]});
            const p1 = screen({x: vt[f[1]][0], y: vt[f[1]][1], z: vt[f[1]][2]});
            const p2 = screen({x: vt[f[2]][0], y: vt[f[2]][1], z: vt[f[2]][2]});
            const p3 = screen({x: vt[f[3]][0], y: vt[f[3]][1], z: vt[f[3]][2]});

            line(p0, p1);
            line(p1, p2);
            line(p2, p3);
            line(p3, p0);
        }
        else if ((f.length % 3) == 0) { // Draw triangles
            const p0 = screen({x: vt[f[0]][0], y: vt[f[0]][1], z: vt[f[0]][2]});
            const p1 = screen({x: vt[f[1]][0], y: vt[f[1]][1], z: vt[f[1]][2]});
            const p2 = screen({x: vt[f[2]][0], y: vt[f[2]][1], z: vt[f[2]][2]});

            line(p0, p1);
            line(p1, p2);
            line(p2, p0);
        }
        else if ((f.length % 2) == 0) { // Draw lines
            const p0 = screen({x: vt[f[0]][0], y: vt[f[0]][1], z: vt[f[0]][2]});
            const p1 = screen({x: vt[f[1]][0], y: vt[f[1]][1], z: vt[f[1]][2]});
            line(p0, p1);
        }
        else { // Draw points.
            point(screen({ x: vt[f[0]][0], y: vt[f[0]][1], z: vt[f[0]][2] }), { w: LINEWIDHT, h: LINEWIDHT });
        }
    }
}

function setup(path) {
    if (path) {
        localStorage.setItem("modelJsScript", path);
        location.reload();
        return;
    }
    else {
        const model = localStorage.getItem("modelJsScript");
        if (!model) { alert("Please select model with model buttons."); return; }

        const element = document.createElement("script");
        element.src = model;

        document.head.appendChild(element);
    }

    canvas = document.getElementById("canv");
    ctx = canvas.getContext("2d");

    width = canvas.width;
    height = canvas.height;

    ctx.fillStyle = FRONTCOLOR;
    ctx.lineWidth = LINEWIDHT;
    ctx.strokeStyle = FRONTCOLOR;

    setTimeout(frame, 1000/FPS);
}

function frame() {
    const dt = 1/FPS;

    if (keystates["left"])  rot.z += (Math.PI*dt);
    if (keystates["right"]) rot.z -= (Math.PI*dt);
    if (keystates["up"])    rot.x -= (Math.PI*dt);
    if (keystates["down"])  rot.x += (Math.PI*dt);
    if (keystates["lt"])    rot.y -= (Math.PI*dt);
    if (keystates["gt"])    rot.y += (Math.PI*dt);

    if (keystates["r"]) pos.y += dt;
    if (keystates["f"]) pos.y -= dt;
    if (keystates["a"]) pos.x -= dt;
    if (keystates["d"]) pos.x += dt;
    if (keystates["w"]) pos.z += dt;
    if (keystates["s"]) pos.z -= dt;

    let vt = [];

    // Rotating

    for (const v of verts) {
        let t = rotateAbs({x: v[0], y: v[1], z: v[2]}, rot);
        t = translate(t, pos);

        vt.push([ t.x, t.y, t.z ]);
    }

    // Rendering
    render(vt, faces);

    setTimeout(frame, 1000/FPS);
}

function keyaction(event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "ArrowLeft": { // Key LEFT
            keystates["left"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "ArrowRight": { // Key RIGHT
            keystates["right"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "ArrowUp": { // Key UP
            keystates["up"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "ArrowDown": { // Key DOWN
            keystates["down"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case ",": { // Key ,
            keystates["lt"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case ".": { // Key .
            keystates["gt"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "r": { // Key r
            keystates["r"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "f": { // Key f
            keystates["f"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "a": { // Key a
            keystates["a"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "d": { // Key d
            keystates["d"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "w": { // Key w
            keystates["w"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "s": { // Key s
            keystates["s"] = (event.type == 'keydown') ? true : false;
            break;
        }
        case "s": { // Key s
            keystates["s"] = (event.type == 'keydown') ? true : false;
            break;
        }
        default: {
            break;
        }
    }
}

document.addEventListener('keydown', keyaction);
document.addEventListener('keyup', keyaction);

// TODO: Filling.
