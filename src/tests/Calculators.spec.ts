import { Point } from "../entities/Point";
import { Triangle } from "../entities/TriangleEntity";
import { Tetrahedron } from "../entities/TetrahedronEntity";
import { TriangleCalculator } from "../services/TriangleCalculator";
import { TetrahedronCalculator } from "../services/TetrahedronCalculator";

describe("Calculators", () => {

    describe("TriangleCalculator", () => {
        const calc = new TriangleCalculator();

        const tri = new Triangle(
            "t1",
            "Triangle_t1",
            new Point(0, 0),
            new Point(3, 0),
            new Point(0, 4)
        );

        it("calculates perimeter correctly", () => {
            expect(calc.perimeter(tri)).toBeCloseTo(3 + 4 + 5);
        });

        it("calculates area correctly", () => {
            expect(calc.area(tri)).toBeCloseTo(6);
        });

        it("checks validity", () => {
            expect(calc.isValidTriangle(tri)).toBe(true);
        });

        it("detects isosceles triangle", () => {
            const isoTri = new Triangle(
                "t2",
                "Triangle_t2",
                new Point(0, 0),
                new Point(2, 0),
                new Point(1, Math.sqrt(3))
            );
            expect(calc.isIsosceles(isoTri)).toBe(true);
        });

        it("detects equilateral triangle", () => {
            const eqTri = new Triangle(
                "t3",
                "Triangle_t3",
                new Point(0, 0),
                new Point(1, Math.sqrt(3)),
                new Point(2, 0)
            );
            expect(calc.isEquilateral(eqTri)).toBe(true);
        });

        it("detects right triangle", () => {
            expect(calc.isRight(tri)).toBe(true);
        });

        it("detects acute triangle", () => {
            const acuteTri = new Triangle(
                "t4",
                "Triangle_t4",
                new Point(0, 0),
                new Point(1, 1),
                new Point(2, 0)
            );
            expect(calc.isAcute(acuteTri)).toBe(true);
        });


        it("detects obtuse triangle", () => {
            const obtuseTri = new Triangle(
                "t5",
                "Triangle_t5",
                new Point(0, 0),
                new Point(4, 0),
                new Point(1, 1)
            );
            expect(calc.isObtuse(obtuseTri)).toBe(true);
        });
    });

    describe("TetrahedronCalculator", () => {
        const calc = new TetrahedronCalculator();

        const tetra = new Tetrahedron(
            "tet1",
            "Tetrahedron_tet1",
            new Point(0, 0, 0),
            new Point(1, 0, 0),
            new Point(0, 1, 0),
            new Point(0, 0, 1)
        );

        it("validates a proper tetrahedron", () => {
            expect(calc.isValid(tetra)).toBe(true);
        });

        it("calculates volume correctly", () => {
            expect(calc.volume(tetra)).toBeCloseTo(1 / 6);
        });

        it("calculates surface area correctly", () => {
            const area = calc.surfaceArea(tetra);
            expect(area).toBeCloseTo(
                0.5 + 0.5 + 0.5 + Math.sqrt(3) / 2
            );
        });

        it("detects base lying on coordinate planes", () => {
            const planes = calc.baseLiesOnCoordinatePlane(tetra);
            expect(planes.XY).toBe(true);
            expect(planes.XZ).toBe(true);
            expect(planes.YZ).toBe(true);
        });

        it("calculates volume ratio for XY plane", () => {
            const ratio = calc.volumeRatio(tetra, "XY");
            expect(ratio.v1 + ratio.v2).toBeCloseTo(calc.volume(tetra));
        });
    });

});
