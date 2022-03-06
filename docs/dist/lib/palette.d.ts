import { Tuple4 } from '../types.js';
export declare const paletteAgbr: number[];
export declare const paletteImageData: ImageData;
export declare const paletteRgbaTuples: Tuple4[];
export declare const paletteHslaTuples: Tuple4[];
export declare const closestPaletteIndex: (rgba: Tuple4<number>, hueWeight?: number, satWeight?: number, lumWeight?: number) => number;
export declare const closestHueIndex: (rgba: Tuple4<number>) => number;
export declare const closestColor: (r?: number, g?: number, b?: number, a?: number) => number;
