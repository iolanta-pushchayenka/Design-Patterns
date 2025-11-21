import { Shape } from "./Shape";
import { Point } from "./Point";

export class Triangle extends Shape {
  constructor(
    id: string,
    public readonly a: Point,
    public readonly b: Point,
    public readonly c: Point
  ) {
    super(id);
  }
}
