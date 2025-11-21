import { TriangleValidator, TRIANGLE_COORD_COUNT } from "../services/TriangleValidator";
import { InvalidDataError } from "../exceptions/InvalidDataError";
import { Point } from "../entities/Point";

describe("TriangleValidator", () => {
  const validator = new TriangleValidator();

  // ---------- parseRow() ----------
  test("parseRow() parses valid row", () => {
    const row = "1 2 3 4 5 6";
    const result = validator.parseRow(row);

    expect(result).toHaveLength(TRIANGLE_COORD_COUNT);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("parseRow() pads missing numbers with 1", () => {
    const row = "1 2 3";
    const result = validator.parseRow(row);

    expect(result).toHaveLength(6);
    expect(result).toEqual([1, 2, 3, 1, 1, 1]);
  });

  test("parseRow() throws when too many numbers", () => {
    const row = "1 2 3 4 5 6 7";

    expect(() => validator.parseRow(row)).toThrow(InvalidDataError);
  });

  test("parseRow() throws when invalid characters present", () => {
    const row = "1 2a 3";

    expect(() => validator.parseRow(row)).toThrow(InvalidDataError);
  });

  test("parseRow() throws when NaN produced", () => {
    const row = "1 2 undefined";

    expect(() => validator.parseRow(row)).toThrow(InvalidDataError);
  });

  // ---------- buildPoints() ----------
  test("buildPoints() creates 3 Point objects", () => {
    const nums = [1, 2, 3, 4, 5, 6];
    const points = validator.buildPoints(nums);

    expect(points).toHaveLength(3);

    expect(points[0]).toBeInstanceOf(Point);
    expect(points[1]).toBeInstanceOf(Point);
    expect(points[2]).toBeInstanceOf(Point);

    expect(points[0]).toEqual(new Point(1, 2));
    expect(points[1]).toEqual(new Point(3, 4));
    expect(points[2]).toEqual(new Point(5, 6));
  });

  // ---------- validatePoints() ----------
  test("validatePoints() throws when not 3 points", () => {
    const pts = [new Point(0, 0), new Point(1, 1)];

    expect(() => validator.validatePoints(pts))
      .toThrow(InvalidDataError);
  });

  test("validatePoints() throws when duplicate points", () => {
    const pts = [
      new Point(0, 0),
      new Point(0, 0),
      new Point(1, 1)
    ];

    expect(() => validator.validatePoints(pts))
      .toThrow(InvalidDataError);
  });

  test("validatePoints() throws when points are collinear", () => {
    const pts = [
      new Point(0, 0),
      new Point(1, 1),
      new Point(2, 2)
    ];

    expect(() => validator.validatePoints(pts))
      .toThrow(InvalidDataError);
  });

  test("validatePoints() passes for valid triangle", () => {
    const pts = [
      new Point(0, 0),
      new Point(1, 0),
      new Point(0, 1)
    ];

    expect(() => validator.validatePoints(pts)).not.toThrow();
  });

});
