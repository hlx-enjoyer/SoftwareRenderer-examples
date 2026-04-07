const verts = [
    // "Front"
    [-0.25,  0.25,  0.25], // Left top
    [ 0.25,  0.25,  0.25], // Right top
    [-0.25, -0.25,  0.25], // Left bottom
    [ 0.25, -0.25,  0.25], // Right bottom

    // "Back"
    [-0.25,  0.25, -0.25], // Left top
    [ 0.25,  0.25, -0.25], // Right top
    [-0.25, -0.25, -0.25], // Left bottom
    [ 0.25, -0.25, -0.25], // Right bottom
];

const faces = [
    // "Front" face
    [0, 1, 2],
    [2, 1, 3],

    // "Back" face
    [4, 5, 6],
    [6, 5, 7],

    // "Left" face
    [0, 4, 2],
    [2, 4, 6],

    // "Right" face
    [1, 5, 3],
    [3, 5, 7],

    // "Top" face
    [0, 1, 5],
    [5, 4, 0],

    // "Bottom" face
    [2, 3, 7],
    [7, 6, 2],
];