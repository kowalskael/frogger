export const distance = (x0, y0, x1, y1) =>
  Math.hypot(x1 - x0, y1 - y0);

export const inRange = (value, min, max) =>
  value >= Math.min(min, max) && value <= Math.max(min, max);

export const range = (min0, max0, min1, max1) =>
  Math.max(min0, max0) > Math.min(min1, max1) && Math.min(min0, max0) < Math.max(min1, max1);

export const collisionDetection = (r0, r1, r2) =>
  range(r0.x - r0.width / 2, r0.x + r0.width / 2, r1.x - r1.width / 2, r1.x + r1.width / 2) &&
  range(r0.y - r0.height / 2, r0.y + r0.height / 2, r2.y - r2.height / 2, r2.y + r2.height / 2);

export const isEven = value => !(value % 2);

export function setDirection(r1, r2, r3) {
  let dir = {x: 0, y: 0};
  if (r1.x <= r2.x) { // block from left
    dir = {x: -1, y: 0};
    console.log(dir);
  }
  if (r1.x >= r2.x) { // block from right
    dir = {x: 1, y: 0};
    console.log(dir);
  }
  if (r1.y <= r3.y) { // block from top
    dir = {x: 0, y: -1};
  }
  if (r1.y >= r3.y) { // block from down
    dir = {x: 0, y: 1};
  }

  return dir;
}

