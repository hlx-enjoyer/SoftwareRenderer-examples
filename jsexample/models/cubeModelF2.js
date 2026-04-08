// Cube example using line wireframe.

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
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],

    // "Back" face
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],

    // "Top" face
    [0, 4],
    [4, 5],
    [5, 1],
    [1, 0],

    // "Bottom" face
    [3, 7],
    [7, 6],
    [6, 2],
    [2, 3],

    // "Left" face
    [0, 4],
    [4, 7],
    [7, 3],
    [3, 0],

    // "Right" face
    [1, 5],
    [5, 6],
    [6, 2],
    [2, 1],
];