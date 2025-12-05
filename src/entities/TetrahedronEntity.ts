import { Shape } from "./Shape";
import { Point } from "./Point";

export class Tetrahedron extends Shape {
  constructor(
    id: string,
    name: string,
    public p1: Point,
    public p2: Point,
    public p3: Point,
    public p4: Point
  ) {
    super(id, name);
  }

  public setP1(p: Point): void {
    this.p1 = p;
    this.notifyObservers();
  }

  public setP2(p: Point): void {
    this.p2 = p;
    this.notifyObservers();
  }

  public setP3(p: Point): void {
    this.p3 = p;
    this.notifyObservers();
  }

  public setP4(p: Point): void {
    this.p4 = p;
    this.notifyObservers();
  }
}
