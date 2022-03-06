export type Point = { x: number, y: number }
export type Size = { width: number, height: number }
export type Tuple3<T = number> = [ T, T, T ]
export type Tuple4<T = number> = [ T, T, T, T ]
export type Voxel = { t: number; h: number; }
export type CornerData = Point & { voxels: Voxel[]; }
