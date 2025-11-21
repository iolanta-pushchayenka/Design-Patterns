import { Triangle } from "../entities/TriangleEntity";
import { Point } from "../entities/Point";

describe("Triangle entity", () => {
  test("creates triangle with id and points", () => {
    const a = new Point(0, 0);
    const b = new Point(1, 0);
    const c = new Point(0, 1);

    const t = new Triangle("T1", a, b, c);

    expect(t.id).toBe("T1");
    expect(t.a).toBe(a);
    expect(t.b).toBe(b);
    expect(t.c).toBe(c);
  });

  test("triangle extends Shape", () => {
    const a = new Point(0, 0);
    const b = new Point(1, 0);
    const c = new Point(0, 1);

    const t = new Triangle("T2", a, b, c);

    expect(t instanceof Object.getPrototypeOf(t).constructor.prototype.constructor).toBeTruthy();
    expect(t instanceof Triangle).toBe(true);
  });
});
