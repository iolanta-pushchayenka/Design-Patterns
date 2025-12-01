import { Tetrahedron } from "../entities/TetrahedronEntity";
import { Point } from "../entities/Point";

export class TetrahedronFactory {
  create(id: string, nums: number[]): Tetrahedron {
    return new Tetrahedron(
      id,
      new Point(nums[0], nums[1], nums[2]),
      new Point(nums[3], nums[4], nums[5]),
      new Point(nums[6], nums[7], nums[8]),
      new Point(nums[9], nums[10], nums[11])
    );
  }
}
