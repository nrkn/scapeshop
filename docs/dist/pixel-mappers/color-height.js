import { getL } from '../lib/color.js';
import { closestColor } from '../lib/palette.js';
export const towerColorHeightMapper = rgba => {
    const { r, g, b, a } = rgba;
    const index = closestColor(r, g, b, a);
    const l = getL(r, g, b);
    const firstFloor = 0;
    const maxFloors = 8;
    const floors = Math.floor(l * maxFloors);
    const voxels = [];
    for (let i = 0; i < floors; i++) {
        const h = i + firstFloor;
        const t = h === 0 ? 15 : index;
        voxels.push({ t, h });
    }
    return voxels;
};
export const baseColorHeightMapper = rgba => {
    const { r, g, b, a } = rgba;
    const index = closestColor(r, g, b, a);
    const l = getL(r, g, b);
    const firstFloor = 0;
    const maxFloors = 8;
    const h = Math.floor(l * maxFloors) + firstFloor - 1;
    if (h === -1)
        return [];
    const t = h === 0 ? 15 : index;
    return [{ t, h }];
};
//# sourceMappingURL=color-height.js.map