// import { Triangle } from "../entities/TriangleEntity";
// import { Point } from "../entities/Point";

// export class TriangleFactory {
//   static create(id: string, nums: number[]): Triangle {
//     const [x1, y1, x2, y2, x3, y3] = nums;
//     return new Triangle(
//       id,
//       new Point(x1, y1),
//       new Point(x2, y2),
//       new Point(x3, y3)
//     );
//   }
// }

import { Triangle } from "../entities/TriangleEntity";
import { Point } from "../entities/Point";

export class TriangleFactory {
  create(id: string, nums: number[]): Triangle {
    const [x1, y1, x2, y2, x3, y3] = nums;

    return new Triangle(
      id,
      new Point(x1, y1),
      new Point(x2, y2),
      new Point(x3, y3)
    );
  }
}
