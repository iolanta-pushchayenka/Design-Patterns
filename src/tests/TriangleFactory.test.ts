import { TriangleFactory } from "../factories/TriangleFactory";
import { Triangle } from "../entities/TriangleEntity";
import { Point } from "../entities/Point";

describe("TriangleFactory", () => {
  test("создаёт Triangle с корректным id и координатами", () => {
    const nums = [1, 2, 3, 4, 5, 6];
    const triangle = TriangleFactory.create("T1", nums);

    expect(triangle).toBeInstanceOf(Triangle);
    expect(triangle.id).toBe("T1");

    // Проверяем точки
    expect(triangle.a).toBeInstanceOf(Point);
    expect(triangle.b).toBeInstanceOf(Point);
    expect(triangle.c).toBeInstanceOf(Point);

    expect(triangle.a.x).toBe(1);
    expect(triangle.a.y).toBe(2);

    expect(triangle.b.x).toBe(3);
    expect(triangle.b.y).toBe(4);

    expect(triangle.c.x).toBe(5);
    expect(triangle.c.y).toBe(6);
  });

  test("корректно работает даже с отрицательными и дробными числами", () => {
    const nums = [-1.5, 2.2, 0, -3, 10.5, 7.7];
    const triangle = TriangleFactory.create("T2", nums);

    expect(triangle.a.x).toBe(-1.5);
    expect(triangle.b.y).toBe(-3);
    expect(triangle.c.x).toBe(10.5);
  });

  test("не выполняет бизнес-валидацию (это делает валидатор)", () => {
    // некорректный треугольник (все точки одинаковые)
    const nums = [1, 1, 1, 1, 1, 1];
    const triangle = TriangleFactory.create("T3", nums);

    // фабрика всё равно создаёт объект
    expect(triangle).toBeInstanceOf(Triangle);
    expect(triangle.a.x).toBe(1);
  });
});
