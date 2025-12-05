import fs from "fs";
import pathModule from "path";

import { TriangleFactory } from "../factories/TriangleFactory";
import { TetrahedronFactory } from "../factories/TetrahedronFactory";

import { TriangleValidator } from "../services/TriangleValidator";
import { TetrahedronValidator } from "../services/TetrahedronValidator";

import { InvalidDataError } from "../exceptions/InvalidDataError";

import { Warehouse } from "../warehouse/Warehouse";
import { triangleRepository, tetraRepository } from "../mainRepositories";

import { logger } from "../logger/logger";

const BASE_DIR = pathModule.resolve("data");

export class FileReader {

  private safeResolve(userPath: string): string {
    const resolved = pathModule.resolve(userPath);
    if (!resolved.startsWith(BASE_DIR)) {
      throw new InvalidDataError(
        `Forbidden path: file must be inside "${BASE_DIR}", got "${userPath}"`
      );
    }
    return resolved;
  }

  // -----------------------------------------------------------
  // TRIANGLES
  // -----------------------------------------------------------

  readTriangles(path: string) {
    const validator = new TriangleValidator();
    const factory = new TriangleFactory();

    const warehouse = Warehouse.getInstance();

    let id = 1;

    try {
      const safePath = this.safeResolve(path);
      const raw = fs.readFileSync(safePath, "utf8");
      const lines = raw.split("\n");

      for (const rawLine of lines) {
        const row = rawLine.trim();
        if (!row) continue;

        try {
          const nums = validator.parseRow(row);
          const points = validator.buildPoints(nums);
          validator.validatePoints(points);

          const triangle = factory.create(`T${id}`, nums);
          id++;

          triangleRepository.add(triangle);
          warehouse.register(triangle);

        } catch (err: any) {
          logger.warn({ row, err: err.message }, "Triangle: skipping row");
        }
      }

    } catch (err: any) {
      logger.error({ path, err }, "readTriangles failed");
      throw err instanceof InvalidDataError
        ? err
        : new InvalidDataError(`Failed to read triangles from "${path}"`);
    }

    // ✔ добавили возврат массива
    return triangleRepository.getAll();
  }

  // -----------------------------------------------------------
  // TETRAHEDRONS
  // -----------------------------------------------------------

  readTetrahedrons(path: string) {
    const validator = new TetrahedronValidator();
    const factory = new TetrahedronFactory();

    const warehouse = Warehouse.getInstance();

    let id = 1;

    try {
      const safePath = this.safeResolve(path);
      const raw = fs.readFileSync(safePath, "utf8");
      const lines = raw.split("\n");

      for (const rawLine of lines) {
        const row = rawLine.trim();
        if (!row) continue;

        try {
          const nums = validator.parseRow(row);
          const points = validator.buildPoints(nums);
          validator.validatePoints(points);

          const tetra = factory.create(`S${id}`, nums);
          id++;

          tetraRepository.add(tetra);
          warehouse.register(tetra);

        } catch (err: any) {
          logger.warn({ row, err: err.message }, "Tetra: skipping row");
        }
      }

    } catch (err: any) {
      logger.error({ path, err }, "readTetrahedrons failed");
      throw err instanceof InvalidDataError
        ? err
        : new InvalidDataError(`Failed to read tetrahedrons from "${path}"`);
    }

    // ✔ добавили возврат массива
    return tetraRepository.getAll();
  }
}      