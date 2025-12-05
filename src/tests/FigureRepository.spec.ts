import { FigureRepository } from "../repository/FigureRepository";
import { ByAreaRangeSpecification } from "../repository/specifications/ByAreaRangeSpecification";
import { Triangle } from "../entities/TriangleEntity";
import { Point } from "../entities/Point";
import { Warehouse } from "../warehouse/Warehouse";

describe("ByAreaRangeSpecification", () => {
    let repo: FigureRepository<Triangle>;
    let warehouse: Warehouse;

    beforeEach(() => {
        repo = new FigureRepository<Triangle>();
        warehouse = Warehouse.getInstance();
        warehouse.clear(); // очищаем предыдущие данные
    });

    it("should return triangles whose area is within the specified range", () => {
        // создаём треугольники
        const tri1 = new Triangle(
            "t1",
            "Triangle1",
            new Point(0, 0),
            new Point(3, 0),
            new Point(0, 4) // площадь 6
        );
        const tri2 = new Triangle(
            "t2",
            "Triangle2",
            new Point(0, 0),
            new Point(1, 0),
            new Point(0, 1) // площадь 0.5
        );
        const tri3 = new Triangle(
            "t3",
            "Triangle3",
            new Point(0, 0),
            new Point(2, 0),
            new Point(0, 3) // площадь 3
        );

        // регистрируем треугольники в Warehouse
        warehouse.register(tri1);
        warehouse.register(tri2);
        warehouse.register(tri3);

        // добавляем треугольники в репозиторий
        repo.addMany([tri1, tri2, tri3]);

        // спецификация для диапазона площадей 3..6
        const spec = new ByAreaRangeSpecification(3, 6);

        // выполняем запрос
        const result = repo.query(spec);

        // проверяем, что результат содержит только tri1 и tri3
        expect(result).toContain(tri1);
        expect(result).toContain(tri3);
        expect(result).not.toContain(tri2);
        expect(result.length).toBe(2);
    });
});
