import { closestColor } from '../lib/palette.js';
export const baseColorMapper = rgba => {
    const { r, g, b, a } = rgba;
    const index = closestColor(r, g, b, a);
    return [{ t: 15, h: 0 }, { t: index, h: 1 }];
};
//# sourceMappingURL=color.js.map