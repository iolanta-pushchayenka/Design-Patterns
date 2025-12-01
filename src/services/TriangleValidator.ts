import { Point } from "../entities/Point";
import { InvalidDataError } from "../exceptions/InvalidDataError";
import { logger } from "../logger/logger";

export const TRIANGLE_ROW_PATTERN =
  /^-?\d+(?:\.\d+)?(?:\s+-?\d+(?:\.\d+)?)*$/;

export const TRIANGLE_COORD_COUNT = 6;

export class TriangleValidator {

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

      const result: number[] = [...numbers];
      while (result.length < TRIANGLE_COORD_COUNT) {
        result.push(1);
      }

      
      if (result.length > TRIANGLE_COORD_COUNT) {
        logger.error({ row }, "Triangle: слишком много значений");
        throw new InvalidDataError("Triangle: превышено количество координат");
      }

      return result;
    } catch (err: any) {
      
      if (err instanceof InvalidDataError) {
        throw err;
      }

      logger.error({ row, err }, "Triangle: ошибка обработки строки");
      throw new InvalidDataError("Triangle: ошибка чтения строки");
    }
  }


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

  validatePoints(points: Point[]): void {
    if (points.length !== 3) {
      throw new InvalidDataError("Triangle: требуется ровно 3 точки");
    }

    this.ensureNoDuplicatePoints(points);
    this.ensureNotCollinear(points[0], points[1], points[2]);
  }

  private ensureNoDuplicatePoints(points: Point[]): void {
    const unique = new Set(points.map(p => `${p.x}_${p.y}`));

    if (unique.size !== points.length) {
      logger.error({ points }, "Triangle: совпадающие точки");
      throw new InvalidDataError("Triangle: две точки совпадают");
    }
  }

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
