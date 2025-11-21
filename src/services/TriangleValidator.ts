// import { Point } from "../entities/Point";

// // Регулярное выражение: ровно 6 чисел
// export const TRIANGLE_ROW_REGEX =
//   /^-?\d+(\.\d+)?(\s+-?\d+(\.\d+)?){5}$/;

// export class TriangleValidator {

//   /**
//    * Проверка, что строка имеет нужный формат: 6 чисел.
//    */
//   static validateRawString(row: string): boolean {
//     return TRIANGLE_ROW_REGEX.test(row.trim());
//   }

//   /**
//    * Проверка, что точки не повторяются.
//    * Дубликаты → треугольник некорректен.
//    */
//   static noDuplicatePoints(points: Point[]): boolean {
//     const set = new Set(points.map(p => `${p.x}_${p.y}_${p.z}`));
//     return set.size === points.length;
//   }

//   /**
//    * Проверка, что точки не коллинеарны.
//    * Вычисляем площадь треугольника через определитель.
//    * Если площадь == 0 → точки лежат на одной прямой.
//    */
//   static areNotCollinear(a: Point, b: Point, c: Point): boolean {
//     const area = Math.abs(
//       a.x * (b.y - c.y) +
//       b.x * (c.y - a.y) +
//       c.x * (a.y - b.y)
//     ) / 2;

//     return area > 0;
//   }

//   /**
//    * Полная проверка 3 точек:
//    * - нет дубликатов
//    * - образуют невырожденный треугольник
//    */
//   static validatePoints(a: Point, b: Point, c: Point): boolean {
//     return (
//       this.noDuplicatePoints([a, b, c]) &&
//       this.areNotCollinear(a, b, c)
//     );
//   }
// }



// src/validators/TriangleValidator.ts
import { Point } from "../entities/Point";
import { InvalidDataError } from "../exceptions/InvalidDataError";
import { logger } from "../logger/logger";

// Разрешены числа типа: -1, 2.5, 0.002
export const TRIANGLE_ROW_PATTERN =
  /^-?\d+(?:\.\d+)?(?:\s+-?\d+(?:\.\d+)?)*$/;

// Нужно ровно 6 чисел (3 точки)
export const TRIANGLE_COORD_COUNT = 6;

export class TriangleValidator {
  /**
   * Парсит строку данных и возвращает массив чисел.
   * Дополняет недостающие числа единицами.
   */
  parseRow(row: string): number[] {
    try {
      const clean = row.trim();

      if (!TRIANGLE_ROW_PATTERN.test(clean)) {
        logger.error({ row }, "Triangle: недопустимые символы в строке");
        throw new InvalidDataError("Triangle: строка содержит неверные символы");
      }

      const numbers = clean.split(/\s+/).map(v => Number(v));

      if (numbers.some(n => Number.isNaN(n))) {
        logger.error({ row }, "Triangle: получены NaN после парсинга");
        throw new InvalidDataError("Triangle: строка содержит нечисловые значения");
      }

      // дополняем недостающее до 6 чисел значением 1
      const result: number[] = [...numbers];
      while (result.length < TRIANGLE_COORD_COUNT) {
        result.push(1);
      }

      // если чисел больше 6 — нельзя
      if (result.length > TRIANGLE_COORD_COUNT) {
        logger.error({ row }, "Triangle: слишком много значений");
        throw new InvalidDataError("Triangle: превышено количество координат");
      }

      return result;
    } catch (err: any) {
      // не допускаем выбрасывания стандартных ошибок
      if (err instanceof InvalidDataError) {
        throw err;
      }

      logger.error({ row, err }, "Triangle: ошибка обработки строки");
      throw new InvalidDataError("Triangle: ошибка чтения строки");
    }
  }

  /**
   * Создаёт точки треугольника.
   */
  buildPoints(nums: number[]): Point[] {
    try {
      return [
        new Point(nums[0], nums[1]),
        new Point(nums[2], nums[3]),
        new Point(nums[4], nums[5]),
      ];
    } catch (err: any) {
      logger.error({ nums, err }, "Triangle: ошибка создания точек");
      throw new InvalidDataError("Triangle: невозможно создать точки");
    }
  }

  /**
   * Проверяет корректность трёх точек треугольника.
   */
  validatePoints(points: Point[]): void {
    if (points.length !== 3) {
      throw new InvalidDataError("Triangle: требуется ровно 3 точки");
    }

    this.ensureNoDuplicatePoints(points);
    this.ensureNotCollinear(points[0], points[1], points[2]);
  }

  /**
   * Проверяет отсутствие совпадающих точек.
   */
  private ensureNoDuplicatePoints(points: Point[]): void {
    const unique = new Set(points.map(p => `${p.x}_${p.y}`));

    if (unique.size !== points.length) {
      logger.error({ points }, "Triangle: совпадающие точки");
      throw new InvalidDataError("Triangle: две точки совпадают");
    }
  }

  /**
   * Проверяет, что точки не лежат на одной прямой.
   */
  private ensureNotCollinear(a: Point, b: Point, c: Point): void {
    const area =
      Math.abs(
        a.x * (b.y - c.y) +
        b.x * (c.y - a.y) +
        c.x * (a.y - b.y)
      ) * 0.5;

    if (area <= 1e-9) {
      logger.error({ a, b, c }, "Triangle: точки коллинеарны");
      throw new InvalidDataError("Triangle: точки лежат на одной прямой");
    }
  }
}
