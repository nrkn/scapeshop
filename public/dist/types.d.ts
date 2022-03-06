export declare type Point = {
    x: number;
    y: number;
};
export declare type Size = {
    width: number;
    height: number;
};
export declare type Tuple3<T = number> = [T, T, T];
export declare type Tuple4<T = number> = [T, T, T, T];
export declare type Voxel = {
    t: number;
    h: number;
};
export declare type CornerData = Point & {
    voxels: Voxel[];
};
