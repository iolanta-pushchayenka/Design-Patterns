import { TriangleFactory } from "../factories/TriangleFactory";
import { TetrahedronFactory } from "../factories/TetrahedronFactory";
import { Triangle } from "../entities/TriangleEntity";
import { Tetrahedron } from "../entities/TetrahedronEntity";
import { Point } from "../entities/Point";

describe("Factories", () => {

    // -------------------------------------------------
    // TRIANGLE FACTORY
    // -------------------------------------------------
    test("TriangleFactory creates a Triangle with correct fields", () => {
        const factory = new TriangleFactory();

        const nums = [0, 0, 3, 0, 0, 4]; // три точки
        const triangle = factory.create("100", nums);

        // Проверяем тип
        expect(triangle).toBeInstanceOf(Triangle);

        // Проверяем id и name
        expect(triangle.id).toBe("100");
        expect(triangle.name).toBe("Triangle_100");

        // Проверяем точки
        expect(triangle.a).toEqual(new Point(0, 0));
        expect(triangle.b).toEqual(new Point(3, 0));
        expect(triangle.c).toEqual(new Point(0, 4));
    });

    // -------------------------------------------------
    // TETRAHEDRON FACTORY
    // -------------------------------------------------
    test("TetrahedronFactory creates a Tetrahedron with correct fields", () => {
        const factory = new TetrahedronFactory();

        const nums = [
            0, 0, 0,   // p1
            1, 0, 0,   // p2
            0, 1, 0,   // p3
            0, 0, 1    // p4
        ];

        const tetra = factory.create("55", nums);

        // Проверка типа
        expect(tetra).toBeInstanceOf(Tetrahedron);

        // id и name
        expect(tetra.id).toBe("55");
        expect(tetra.name).toBe("Tetrahedron_55");

        // точки
        expect(tetra.p1).toEqual(new Point(0, 0, 0));
        expect(tetra.p2).toEqual(new Point(1, 0, 0));
        expect(tetra.p3).toEqual(new Point(0, 1, 0));
        expect(tetra.p4).toEqual(new Point(0, 0, 1));
    });

});
