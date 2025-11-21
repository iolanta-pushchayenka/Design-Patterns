import { Point } from "../../src/entities/Point";

describe("Point entity", () => {
  test("should create a point with correct coordinates", () => {
    const p = new Point(1, 2, 3);

    expect(p.x).toBe(1);
    expect(p.y).toBe(2);
    expect(p.z).toBe(3);
  });

  test("should keep numeric types", () => {
    const p = new Point(10.5, -2.2, 0);

    expect(typeof p.x).toBe("number");
    expect(typeof p.y).toBe("number");
    expect(typeof p.z).toBe("number");
  });
});
