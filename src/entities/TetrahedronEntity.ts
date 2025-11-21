import { Shape } from "./Shape";
import { Point } from "./Point";

export class Tetrahedron extends Shape {
  constructor(
    id: string,
    public readonly p1: Point,
    public readonly p2: Point,
    public readonly p3: Point,
    public readonly p4: Point
  ) {
    super(id);
  }
}
