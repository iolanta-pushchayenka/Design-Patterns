import { Point } from "../entities/Point";
import { InvalidDataError } from "../exceptions/InvalidDataError";
import { logger } from "../logger/logger";

export const TETRA_ROW_PATTERN =
  /^-?\d+(?:\.\d+)?(?:\s+-?\d+(?:\.\d+)?)*$/;

export const TETRA_COORD_COUNT = 12;

export class TetrahedronValidator {

  parseRow(row: string): number[] {
    try {
      const clean = row.trim();

      
      if (!TETRA_ROW_PATTERN.test(clean)) {
        logger.error({ row }, "Tetra: строка содержит недопустимые символы");
        throw new InvalidDataError("Tetra: строка содержит неверные символы");
      }

      const numbers = clean.split(/\s+/).map(v => Number(v));

      
      if (numbers.some(n => Number.isNaN(n))) {
        logger.error({ row }, "Tetra: получены NaN");
        throw new InvalidDataError("Tetra: найдены нечисловые значения");
      }

      
      const result: number[] = [...numbers];
      while (result.length < TETRA_COORD_COUNT) {
        result.push(1);
      }

      if (result.length > TETRA_COORD_COUNT) {
        logger.error({ row }, "Tetra: слишком много чисел");
        throw new InvalidDataError("Tetra: превышено количество координат");
      }

      return result;
    } catch (err: any) {
      if (err instanceof InvalidDataError) {
        throw err;
      }

      logger.error({ row, err }, "Tetra: ошибка обработки строки");
      throw new InvalidDataError("Tetra: ошибка разбора строки");
    }
  }


  buildPoints(nums: number[]): Point[] {
    try {

      if (nums.length !== TETRA_COORD_COUNT) {
        logger.error({ nums }, "Tetra: неверное количество координат");
        throw new InvalidDataError(
          "Tetra: требуется 12 координат для построения точек"
        );
      }

      return [
        new Point(nums[0], nums[1], nums[2]),
        new Point(nums[3], nums[4], nums[5]),
        new Point(nums[6], nums[7], nums[8]),
        new Point(nums[9], nums[10], nums[11]),
      ];
    } catch (err: any) {
      logger.error({ nums, err }, "Tetra: ошибка создания точек");
      throw new InvalidDataError("Tetra: невозможно создать точки");
    }
  }


  validatePoints(points: Point[]): void {
    if (points.length !== 4) {
      throw new InvalidDataError("Tetra: требуется 4 точки");
    }

    this.ensureNoDuplicatePoints(points);
    this.ensureNonZeroVolume(points);
  }


  private ensureNoDuplicatePoints(points: Point[]): void {
    const unique = new Set(points.map(p => `${p.x}_${p.y}_${p.z}`));

    if (unique.size !== points.length) {
      logger.error({ points }, "Tetra: совпадающие точки");
      throw new InvalidDataError("Tetra: точки совпадают");
    }
  }

  private ensureNonZeroVolume([a, b, c, d]: Point[]): void {
    const vol = this.mixedProduct(a, b, c, d);

    if (Math.abs(vol) <= 1e-9) {
      logger.error({ a, b, c, d }, "Tetra: объём равен нулю");
      throw new InvalidDataError("Tetra: точки лежат в одной плоскости");
    }
  }


  private mixedProduct(a: Point, b: Point, c: Point, d: Point): number {
    const ab = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const ac = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const ad = { x: d.x - a.x, y: d.y - a.y, z: d.z - a.z };

    const cross = {
      x: ab.y * ac.z - ab.z * ac.y,
      y: ab.z * ac.x - ab.x * ac.z,
      z: ab.x * ac.y - ab.y * ac.x,
    };

    return cross.x * ad.x + cross.y * ad.y + cross.z * ad.z;
  }
}
