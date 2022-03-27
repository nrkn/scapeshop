export const pixelMapper = rgba => {
  const { r, g, b } = rgba;
  const l = getL(r, g, b);
  const firstFloor = 0;
  const maxFloors = 14;
  let floors = Math.floor(l * maxFloors);

  if (floors > 1) floors += Math.random() < 0.25 ? 1 : 0

  const voxels = [];
  for (let i = 0; i < floors; i++) {
    const h = i + firstFloor;

    // density - 75% - don't mess with base or roof
    if( h > 1 && i < floors - 1 ){
      if( Math.random() < 0.25 ) continue
    }

    let color = 14

    if( Math.random() < 0.66 ){
      color = Math.floor( Math.random() * 3 ) + 12
    } else {
      color = Math.floor( Math.random() * 12 )
    }

    const t = h === 0 ? 15 : color;

    voxels.push({ t, h });
  }
  return voxels;
};

const getL = (r = 0, g = 0, b = 0) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;