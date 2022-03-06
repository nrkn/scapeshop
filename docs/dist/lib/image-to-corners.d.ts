import { CornerData, Point } from '../types.js';
import { PixelMapper } from '../pixel-mappers/types.js';
export declare const imageToCorners: (grid: Point[], sourceImage: ImageData, pixelMapper: PixelMapper, offset?: Point, debug?: (...args: any[]) => void) => CornerData[];
