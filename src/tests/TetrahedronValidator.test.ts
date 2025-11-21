import { TetrahedronValidator } from "../../src/services/TetrahedronValidator";
import { InvalidDataError } from "../../src/exceptions/InvalidDataError";
import { Point } from "../../src/entities/Point";

describe("TetrahedronValidator", () => {
  let validator: TetrahedronValidator;

  beforeEach(() => {
    validator = new TetrahedronValidator();
  });

  // -----------------------------
  // parseRow
  // -----------------------------
  describe("parseRow", () => {
    test("корректно парсит 12 чисел", () => {
      const row = "1 2 3  4 5 6  7 8 9  10 11 12";
      const result = validator.parseRow(row);

      expect(result).toHaveLength(12);
      expect(result).toEqual([1,2,3,4,5,6,7,8,9,10,11,12]);
    });

    test("дополняет до 12 значений единицами", () => {
      const row = "1 2 3 4"; // 4 числа → должны добавиться 8 единиц

      const result = validator.parseRow(row);
      expect(result).toHaveLength(12);
      expect(result).toEqual([1,2,3,4,1,1,1,1,1,1,1,1]);
    });

    test("бросает ошибку при лишних значениях", () => {
      const row = Array(13).fill(1).join(" ");
      expect(() => validator.parseRow(row)).toThrow(InvalidDataError);
    });

    test("бросает ошибку при недопустимых символах", () => {
      const row = "1 2 ! 3";
      expect(() => validator.parseRow(row)).toThrow(InvalidDataError);
    });

    test("бросает ошибку при NaN значении", () => {
      const row = "1 2 abc 4";
      expect(() => validator.parseRow(row)).toThrow(InvalidDataError);
    });
  });

  // -----------------------------
  // buildPoints
  // -----------------------------
  describe("buildPoints", () => {
    test("создаёт 4 точки корректно", () => {
      const nums = [1,2,3,  4,5,6,  7,8,9,  10,11,12];
      const points = validator.buildPoints(nums);

      expect(points).toHaveLength(4);
      expect(points[0]).toEqual(new Point(1,2,3));
      expect(points[3]).toEqual(new Point(10,11,12));
    });

    test("бросает ошибку при некорректных данных (меньше 12 чисел)", () => {
      const nums = [1, 2, 3]; // слишком мало
      expect(() => validator.buildPoints(nums as any)).toThrow(InvalidDataError);
    });
  });

  // -----------------------------
  // validatePoints
  // -----------------------------
  describe("validatePoints", () => {
    test("валидный тетраэдр проходит проверку", () => {
      const points = [
        new Point(0, 0, 0),
        new Point(1, 0, 0),
        new Point(0, 1, 0),
        new Point(0, 0, 1),
      ];

      expect(() => validator.validatePoints(points)).not.toThrow();
    });

    test("ошибка если точек меньше 4", () => {
      const points = [
        new Point(0, 0, 0),
        new Point(1, 0, 0),
      ];

      expect(() => validator.validatePoints(points)).toThrow(InvalidDataError);
    });

    test("ошибка при совпадающих точках", () => {
      const points = [
        new Point(0, 0, 0),
        new Point(1, 0, 0),
        new Point(0, 1, 0),
        new Point(0, 0, 0), // duplicate
      ];

      expect(() => validator.validatePoints(points)).toThrow(InvalidDataError);
    });

    test("ошибка при нулевом объёме (все точки в одной плоскости)", () => {
      const points = [
        new Point(0, 0, 0),
        new Point(1, 0, 0),
        new Point(0, 1, 0),
        new Point(1, 1, 0), // Z = 0 → тетраэдр вырожден
      ];

      expect(() => validator.validatePoints(points)).toThrow(InvalidDataError);
    });
  });
});
