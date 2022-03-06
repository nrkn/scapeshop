import { Point, Tuple4 } from '../types.js';
export declare const ass: <T>(value: T | null | undefined) => T;
export declare const getViewBox: (corners: Point[]) => Tuple4<number>;
export declare const degreeDelta: (deg1: number, deg2: number) => number;
export declare const clone: <T>(value: T) => T;
