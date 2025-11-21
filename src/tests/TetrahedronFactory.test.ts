import { TetrahedronFactory } from "../factories/TetrahedronFactory";
import { Tetrahedron } from "../entities/TetrahedronEntity";
import { Point } from "../entities/Point";

describe("TetrahedronFactory", () => {
    test("создаёт Tetrahedron с корректным id и координатами", () => {
        const nums = [
            1, 2, 3,
            4, 5, 6,
            7, 8, 9,
            10, 11, 12
        ];

        const tetra = TetrahedronFactory.create("S1", nums);

        expect(tetra).toBeInstanceOf(Tetrahedron);
        expect(tetra.id).toBe("S1");

        expect(tetra.p1).toBeInstanceOf(Point);
        expect(tetra.p2).toBeInstanceOf(Point);
        expect(tetra.p3).toBeInstanceOf(Point);
        expect(tetra.p4).toBeInstanceOf(Point);

        expect(tetra.p1.x).toBe(1);
        expect(tetra.p1.y).toBe(2);
        expect(tetra.p1.z).toBe(3);

        expect(tetra.p4.x).toBe(10);
        expect(tetra.p4.y).toBe(11);
        expect(tetra.p4.z).toBe(12);
    });

    test("корректно создаёт объект с отрицательными и дробными координатами", () => {
        const nums = [
            -1.1, 2.2, -3.3,
            0, 0, 0,
            5.5, -6.6, 7.7,
            9.9, 10.1, -11.2
        ];

        const tetra = TetrahedronFactory.create("S2", nums);

        expect(tetra.p1.x).toBe(-1.1);
        expect(tetra.p1.z).toBe(-3.3);
        expect(tetra.p3.y).toBe(-6.6);
        expect(tetra.p4.z).toBe(-11.2);
    });

    test("фабрика не проверяет валидность данных (валидация — вне фабрики)", () => {
        const nums = Array(12).fill(0);
        const tetra = TetrahedronFactory.create("S3", nums);

        expect(tetra).toBeInstanceOf(Tetrahedron);
        expect(tetra.p1.x).toBe(0);
    });
});

