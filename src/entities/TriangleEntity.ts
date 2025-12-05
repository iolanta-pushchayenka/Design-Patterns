import { Shape } from "./Shape";
import { Point } from "./Point";

export class Triangle extends Shape {
  constructor(
    id: string,
    name: string,
    public a: Point,
    public b: Point,
    public c: Point
  ) {
    super(id, name);
  }

public setA(point: Point): void {
    this.a = point;
    this.notifyObservers();
  }

  public setB(point: Point): void {
    this.b = point;
    this.notifyObservers();
  }

  public setC(point: Point): void {
    this.c = point;
    this.notifyObservers();
  }
}

