// Cube example using points.

const verts = [
    // "Front"
    [-0.25,  0.25,  0.25], // Left top
    [ 0.25,  0.25,  0.25], // Right top
    [ 0.25, -0.25,  0.25], // Right bottom
    [-0.25, -0.25,  0.25], // Left bottom

    // "Back"
    [-0.25,  0.25, -0.25], // Left top
    [ 0.25,  0.25, -0.25], // Right top
    [ 0.25, -0.25, -0.25], // Right bottom
    [-0.25, -0.25, -0.25], // Left bottom
];

const faces = [
    // "Front" face
    [0],
    [1],
    [2],
    [3],

    // "Back" face
    [4],
    [5],
    [6],
    [7],

    // "Top" face
    [0],
    [4],
    [5],
    [1],

    // "Bottom" face
    [3],
    [7],
    [6],
    [2],

    // "Left" face
    [0],
    [4],
    [7],
    [3],

    // "Right" face
    [1],
    [5],
    [6],
    [2],
];