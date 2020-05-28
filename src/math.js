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

export
function rectangleCollision(
  r1, r2, r3, bounce = false, global = true
) {

  let collision, combinedHalfWidths, combinedHalfHeights,
    overlapX, overlapY, vx, vy;

  //Calculate the distance vector

    vx = (r1.x + r1.width/2) - (r2.x + r2.width/2);
    vy = (r1.y + r1.height/2) - (r3.y + r3.height/2);

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.width/2 + r2.width/2;
  combinedHalfHeights = r1.height/2 + r3.height/2;

  //Check whether vx is less than the combined half widths
  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {

      overlapX = combinedHalfWidths - Math.abs(vx);
      overlapY = combinedHalfHeights - Math.abs(vy);

      if (overlapX >= overlapY) {
        if (vy > 0) {
          collision = "top";
          r1.y = r1.y + overlapY;
        } else {
          collision = "bottom";
          r1.y = r1.y - overlapY;
        }
      } else {

        if (vx > 0) {
          collision = "left";
          r1.x = r1.x + overlapX;
        } else {
          collision = "right";
          r1.x = r1.x - overlapX;
        }
      }
    }
  }
console.log(collision)
  return collision;
}

