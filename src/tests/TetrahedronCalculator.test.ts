import { TetrahedronCalculator } from "../services/TetrahedronCalculator";
import { Tetrahedron } from "../entities/TetrahedronEntity";
import { Point } from "../entities/Point";
import { CalculationError } from "../exceptions/CalculationError";

function tet(p1: Point, p2: Point, p3: Point, p4: Point) {
    return new Tetrahedron("T", p1, p2, p3, p4);
}

describe("TetrahedronCalculator", () => {

    describe("isValid()", () => {

        test("valid tetrahedron returns true", () => {
            const t = tet(
                new Point(0, 0, 0),
                new Point(1, 0, 0),
                new Point(0, 1, 0),
                new Point(0, 0, 1)
            );

            expect(TetrahedronCalculator.isValid(t)).toBe(true);
        });

        test("coplanar points return false (invalid tetrahedron)", () => {
            const t = tet(
                new Point(0, 0, 0),
                new Point(1, 0, 0),
                new Point(2, 0, 0),
                new Point(3, 0, 0)
            );

            expect(TetrahedronCalculator.isValid(t)).toBe(false);
        });

        test("throws CalculationError for invalid input", () => {
            const t: any = new Tetrahedron(
                "X",
                new Point(0, 0, 0),
                null as any,
                new Point(1, 0, 0),
                new Point(0, 1, 0)
            );

            expect(() => TetrahedronCalculator.isValid(t)).toThrow(CalculationError);
        });
    });

    describe("volume()", () => {

        test("correct volume for 1/6 tetrahedron", () => {
            const t = tet(
                new Point(0, 0, 0),
                new Point(1, 0, 0),
                new Point(0, 1, 0),
                new Point(0, 0, 1)
            );

            expect(TetrahedronCalculator.volume(t)).toBeCloseTo(1 / 6);
        });

        test("volume is zero for coplanar points", () => {
            const t = tet(
                new Point(0, 0, 0),
                new Point(2, 0, 0),
                new Point(4, 0, 0),
                new Point(1, 0, 0)
            );

            expect(TetrahedronCalculator.volume(t)).toBeCloseTo(0);
        });

        test("throws CalculationError for broken input", () => {
            const t: any = tet(
                new Point(0, 0, 0),
                new Point(1, 0, 0),
                null as any,
                new Point(0, 1, 0)
            );

            expect(() => TetrahedronCalculator.volume(t)).toThrow(CalculationError);
        });
    });


    describe("surfaceArea()", () => {

        test("correct surface area for simple tetrahedron", () => {
            const t = tet(
                new Point(0, 0, 0),
                new Point(1, 0, 0),
                new Point(0, 1, 0),
                new Point(0, 0, 1)
            );

            const expected = 0.5 + 0.5 + 0.5 + Math.sqrt(3) / 2;

            expect(TetrahedronCalculator.surfaceArea(t)).toBeCloseTo(expected);
        });

        test("throws CalculationError for invalid input", () => {
            const t: any = tet(
                new Point(0, 0, 0),
                undefined as any,
                new Point(0, 1, 0),
                new Point(0, 0, 1)
            );

            expect(() => TetrahedronCalculator.surfaceArea(t)).toThrow(CalculationError);
        });

    });

    describe("baseLiesOnCoordinatePlane()", () => {

        test("detects base on XY plane", () => {
            const t = tet(
                new Point(0, 0, 0),
                new Point(1, 0, 0),
                new Point(0, 1, 0),
                new Point(1, 1, 1)
            );

            const res = TetrahedronCalculator.baseLiesOnCoordinatePlane(t);

            expect(res.XY).toBe(true);
            expect(res.YZ).toBe(false);
            expect(res.XZ).toBe(false);
        });

        test("detects base on YZ plane", () => {
            const t = tet(
                new Point(0, 0, 1),
                new Point(0, 1, 2),
                new Point(0, 2, 3),
                new Point(1, 1, 1)
            );

            const res = TetrahedronCalculator.baseLiesOnCoordinatePlane(t);

            expect(res.YZ).toBe(true);
            expect(res.XY).toBe(false);
            expect(res.XZ).toBe(false);
        });

        test("detects no base on any plane", () => {
            const t = tet(
                new Point(1, 1, 1),
                new Point(2, 1, 1),
                new Point(1, 2, 1),
                new Point(1, 1, 2)
            );

            const res = TetrahedronCalculator.baseLiesOnCoordinatePlane(t);

            expect(res.XY).toBe(false);
            expect(res.YZ).toBe(false);
            expect(res.XZ).toBe(false);
        });

    });

    describe("volumeRatio()", () => {

        test("returns full volume when tetrahedron is entirely above XY plane", () => {
            const t = tet(
                new Point(0, 0, 1),
                new Point(1, 0, 2),
                new Point(0, 1, 2),
                new Point(1, 1, 3)
            );

            const res = TetrahedronCalculator.volumeRatio(t, "XY");

            expect(res.intersects).toBe(false);
            expect(res.v2).toBe(0);
            expect(res.ratio).toBe(Infinity);
        });

        test("returns correct ratio when plane intersects tetrahedron", () => {
            const t = tet(
                new Point(0, 0, -1),
                new Point(1, 0, 2),
                new Point(0, 1, -2),
                new Point(1, 1, 3)
            );

            const res = TetrahedronCalculator.volumeRatio(t, "XY");

            expect(res.intersects).toBe(true);
            expect(res.v1 + res.v2).toBeCloseTo(TetrahedronCalculator.volume(t));
        });

        test("throws CalculationError for invalid input", () => {
            const t: any = tet(
                new Point(0, 0, 0),
                null as any,
                new Point(0, 1, 0),
                new Point(0, 0, 1)
            );

            expect(() => TetrahedronCalculator.volumeRatio(t, "XY")).toThrow(CalculationError);
        });

    });

});
