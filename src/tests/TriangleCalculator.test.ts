import { Triangle } from "../entities/TriangleEntity";
import { Point } from "../entities/Point";
import { TriangleCalculator } from "../services/TriangleCalculator";
import { InvalidDataError } from "../exceptions/InvalidDataError";
import { CalculationError } from "../exceptions/CalculationError";

// Утилита для создания треугольников
const tri = (a: Point, b: Point, c: Point) => new Triangle("T1", a, b, c);

describe("TriangleCalculator", () => {

  // ---------------- ПЕРИМЕТР ----------------
  test("perimeter() computes correct perimeter", () => {
    const t = tri(new Point(0, 0), new Point(3, 0), new Point(0, 4)); // 3-4-5
    expect(TriangleCalculator.perimeter(t)).toBeCloseTo(12);
  });

  test("perimeter() throws InvalidDataError on undefined triangle", () => {
    // @ts-expect-error
    expect(() => TriangleCalculator.perimeter(undefined))
      .toThrow(InvalidDataError);
  });

  // ---------------- ПЛОЩАДЬ ----------------
  test("area() computes correct area", () => {
    const t = tri(new Point(0, 0), new Point(4, 0), new Point(0, 3));
    expect(TriangleCalculator.area(t)).toBeCloseTo(6);
  });

  // ---------------- ВАЛИДАЦИЯ ----------------
  test("isValidTriangle() returns true for non-degenerate triangle", () => {
    const t = tri(new Point(0, 0), new Point(1, 0), new Point(0, 1));
    expect(TriangleCalculator.isValidTriangle(t)).toBe(true);
  });

  test("isValidTriangle() returns false for degenerate triangle (collinear points)", () => {
    const t = tri(new Point(0, 0), new Point(1, 1), new Point(2, 2));
    expect(TriangleCalculator.isValidTriangle(t)).toBe(false);
  });

  // ---------------- РАВНОБЕДРЕННЫЙ ----------------
  test("isIsosceles() correctly detects isosceles triangle", () => {
    const t = tri(new Point(0, 0), new Point(2, 0), new Point(1, Math.sqrt(3)));
    expect(TriangleCalculator.isIsosceles(t)).toBe(true);
  });

  // ---------------- РАВНОСТОРОННИЙ ----------------
  test("isEquilateral() detects an equilateral triangle", () => {
    const t = tri(
      new Point(0, 0),
      new Point(1, 0),
      new Point(0.5, Math.sqrt(3) / 2)
    );
    expect(TriangleCalculator.isEquilateral(t)).toBe(true);
  });

  // ---------------- ПРЯМОУГОЛЬНЫЙ ----------------
  test("isRight() detects a right triangle", () => {
    const t = tri(new Point(0, 0), new Point(3, 0), new Point(0, 4));
    expect(TriangleCalculator.isRight(t)).toBe(true);
  });

  // ---------------- ОСТРОУГОЛЬНЫЙ ----------------
  test("isAcute() detects acute triangle", () => {
    const t = tri(new Point(0, 0), new Point(2, 0), new Point(1, 2));
    expect(TriangleCalculator.isAcute(t)).toBe(true);
  });

  // ---------------- ТУПООУГОЛЬНЫЙ ----------------
  test("isObtuse() detects obtuse triangle", () => {
    const t = tri(new Point(0, 0), new Point(3, 0), new Point(1, 0.2));
    expect(TriangleCalculator.isObtuse(t)).toBe(true);
  });

  // ---------------- Ошибки ----------------
  test("throws InvalidDataError when distance gets undefined point", () => {
    const t = tri(new Point(0, 0), new Point(1, 0), undefined as any);

    expect(() => TriangleCalculator.perimeter(t))
      .toThrow(InvalidDataError);
  });

  test("throws InvalidDataError when triangle is undefined", () => {
    // @ts-expect-error
    expect(() => TriangleCalculator.area(undefined))
      .toThrow(InvalidDataError);
  });

});
