import { getL } from '../lib/color.js';
// 50% threshold - simplest pixel mapper
export const thresholdMapper = rgba => {
    const { r, g, b } = rgba;
    const l = getL(r, g, b);
    if (l < 0.5)
        return [];
    return [{ t: 15, h: 0 }];
};
//# sourceMappingURL=threshold.js.map