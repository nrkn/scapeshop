import { rgbToHsl } from './color.js';
import { degreeDelta } from './util.js';
export const paletteAgbr = [
    0xff4444ec,
    0xff5b8df3,
    0xff66d6f3,
    0xff76e9d9,
    0xff7cc3ac,
    0xff62d684,
    0xff70cf45,
    0xffa5c849,
    0xffcfba49,
    0xffff9a53,
    0xffcf7972,
    0xff7557b9,
    0xff8caacf,
    0xff9da4b2,
    0xffdedede // 14  
];
export const paletteImageData = new ImageData(paletteAgbr.length, 1);
{
    const imageDataView = new Uint32Array(paletteImageData.data.buffer);
    for (let i = 0; i < paletteAgbr.length; i++) {
        imageDataView[i] = paletteAgbr[i];
    }
}
export const paletteRgbaTuples = [];
{
    for (let i = 0; i < paletteAgbr.length; i++) {
        const dataIndex = i * 4;
        const r = paletteImageData.data[dataIndex];
        const g = paletteImageData.data[dataIndex + 1];
        const b = paletteImageData.data[dataIndex + 2];
        const a = paletteImageData.data[dataIndex + 3];
        paletteRgbaTuples[i] = [r, g, b, a];
    }
}
export const paletteHslaTuples = paletteRgbaTuples.map(([r, g, b, a]) => [...rgbToHsl(r, g, b), a]);
export const closestPaletteIndex = (rgba, hueWeight = 2, satWeight = 1, lumWeight = 1) => {
    let index = 0;
    let delta = Number.MAX_SAFE_INTEGER;
    const [h, s, l] = rgbToHsl(rgba[0], rgba[1], rgba[2]);
    for (let i = 0; i < paletteHslaTuples.length; i++) {
        const [ch, cs, cl] = paletteHslaTuples[i];
        const deltaH = degreeDelta(h, ch) / 180;
        const deltaS = Math.abs(s - cs) / 100;
        const deltaL = Math.abs(l - cl) / 100;
        const deltaHS = deltaH * hueWeight * deltaS * satWeight;
        const deltaSL = deltaL * lumWeight * (1 - deltaS) * satWeight;
        const deltaHSL = deltaHS + deltaSL;
        if (deltaHSL < delta) {
            index = i;
            delta = deltaHSL;
        }
    }
    return index;
};
export const closestHueIndex = (rgba) => {
    let index = 0;
    let delta = Number.MAX_SAFE_INTEGER;
    const [h] = rgbToHsl(rgba[0], rgba[1], rgba[2]);
    for (let i = 0; i < paletteHslaTuples.length; i++) {
        const [ch] = paletteHslaTuples[i];
        const deltaH = degreeDelta(h, ch) / 180;
        if (deltaH < delta) {
            index = i;
            delta = deltaH;
        }
    }
    return index;
};
export const closestColor = (r = 0, g = 0, b = 0, a = 0) => {
    let index = 0;
    let delta = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < paletteRgbaTuples.length; i++) {
        const [cr, cg, cb, ca] = paletteRgbaTuples[i];
        const dr = Math.abs(r - cr);
        const dg = Math.abs(g - cg);
        const db = Math.abs(b - cb);
        const da = Math.abs(a - ca);
        const d = dr + dg + db + da;
        if (d < delta) {
            index = i;
            delta = d;
        }
    }
    return index;
};
//# sourceMappingURL=palette.js.map