import { Point, Voxel } from '../types.js';
export declare type PixelMapperData = {
    r: number;
    g: number;
    b: number;
    a: number;
    x: number;
    y: number;
    imageData: ImageData;
    gridX: number;
    gridY: number;
    grid: Point[];
};
export declare type PixelMapper = {
    (data: PixelMapperData): Voxel[];
};
