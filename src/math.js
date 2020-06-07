export const isEven = value => !(value % 2);

export const distance = (x0, y0, x1, y1) =>
  Math.hypot(x1 - x0, y1 - y0);

export const inRange = (value, min, max) =>
  value >= Math.min(min, max) && value <= Math.max(min, max);

export const range = (min0, max0, min1, max1) =>
  Math.max(min0, max0) > Math.min(min1, max1) && Math.min(min0, max0) < Math.max(min1, max1);

export const collisionDetection = (r0, r1, r2) =>
  range(r0.x + r0.width / 4, r0.x + (r0.width - r0.width / 4), r1.x, r1.x + r1.width) &&
  range(r0.y, r0.y + r0.height, r2.y, r2.y + r2.height);

export function setDirection(frog, col, row) {
  let collision;

  let vx = (frog.x + frog.width / 2) - (col.x + col.width / 2); // vector of collision x, LEFT = (-), RIGHT = (+)
  let vy = (frog.y + frog.height / 2) - (row.y + row.height / 2);

  if (Math.abs(vx) <= frog.width / 2 + col.width / 2) {
    if (Math.abs(vy) <= frog.height / 2 + row.height / 2) {

      let overlapX = (frog.width / 2 + col.width / 2) - Math.abs(vx);
      let overlapY = (frog.height / 2 + row.height / 2) - Math.abs(vy);
      console.log('none', 'overlapX:', overlapX, 'frogX:', frog.x, 'colX:', col.x)
      if (overlapX <= overlapY) {
        if (vx < 0) { // block from left
          collision = 'left';
          console.log('left', 'overlapX:', overlapX, 'frogX:', frog.x, 'colX:', col.x)
        } else { // block from right
          collision = 'right';
          console.log('right', 'overlapX:', overlapX, 'frogX:', frog.x, 'colX:', col.x)
        }

      } else {
        if (vy < 0) { // block from top
          collision = 'top';
         console.log('top', 'overlapY:', overlapY, 'frogY:', frog.y, 'rowY:', row.y)
        } else { // block from down
          collision = 'bottom';
         console.log('bottom', 'overlapY:', overlapY, 'frogY:', frog.y, 'rowY:', row.y)
        }

      }
    }
  }

  return collision;
}

