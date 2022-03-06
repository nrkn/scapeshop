export const ass = (value) => {
    if (value === null)
        throw Error('Unexpected null');
    if (value === undefined)
        throw Error('Unexpected undefined');
    return value;
};
export const getViewBox = (corners) => {
    let left = Number.MAX_SAFE_INTEGER;
    let right = Number.MIN_SAFE_INTEGER;
    let top = Number.MAX_SAFE_INTEGER;
    let bottom = Number.MIN_SAFE_INTEGER;
    for (const corner of corners) {
        if (corner.x < left)
            left = corner.x;
        if (corner.x > right)
            right = corner.x;
        if (corner.y < top)
            top = corner.y;
        if (corner.y > bottom)
            bottom = corner.y;
    }
    const width = right - left;
    const height = bottom - top;
    const viewBox = [left, top, width, height];
    return viewBox;
};
const deg2rad = Math.PI / 180;
const rad2Deg = 180 / Math.PI;
export const degreeDelta = (deg1, deg2) => {
    const b1Rad = deg1 * deg2rad;
    const b2Rad = deg2 * deg2rad;
    const b1y = Math.cos(b1Rad);
    const b1x = Math.sin(b1Rad);
    const b2y = Math.cos(b2Rad);
    const b2x = Math.sin(b2Rad);
    const dotp = b1x * b2x + b1y * b2y;
    return Math.acos(dotp) * rad2Deg;
};
export const clone = (value) => JSON.parse(JSON.stringify(value));
//# sourceMappingURL=util.js.map