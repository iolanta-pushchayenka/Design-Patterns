import fs from "fs";
import pathModule from "path";
import { TriangleFactory } from "../factories/TriangleFactory";
import { TetrahedronFactory } from "../factories/TetrahedronFactory";
import { TriangleValidator } from "../services/TriangleValidator";
import { TetrahedronValidator } from "../services/TetrahedronValidator";
import { InvalidDataError } from "../exceptions/InvalidDataError";
import { logger } from "../logger/logger";

const BASE_DIR = pathModule.resolve("data");

export class FileReader {

  private safeResolve(userPath: string): string {
    try {
      const resolved = pathModule.resolve(userPath);

      if (!resolved.startsWith(BASE_DIR)) {
        throw new InvalidDataError(
          `Forbidden path: file must be inside "${BASE_DIR}", got "${userPath}"`
        );
      }

      return resolved;

    } catch (err: any) {
      logger.error({ userPath, err }, "safeResolve failed");

      if (err instanceof InvalidDataError) throw err;
      throw new InvalidDataError("Failed to resolve file path");
    }
  }

  // TRIANGLES 

  readTriangles(path: string) {
    const result: any[] = [];
    const validator = new TriangleValidator();
    const triangleFactory = new TriangleFactory();
    let id = 1;

    try {
      const safePath = this.safeResolve(path);

      let raw: string;
      try {
        raw = fs.readFileSync(safePath, "utf8");
      } catch (fsErr: any) {
        throw new InvalidDataError(
          `Cannot read triangle file "${path}": ${fsErr.message}`
        );
      }

      const lines = raw.split("\n");

      for (const rawLine of lines) {
        const row = rawLine.trim();
        if (!row) continue;

        try {
          const nums = validator.parseRow(row);
          const points = validator.buildPoints(nums);
          validator.validatePoints(points);

          const triangle = triangleFactory.create(`T${id}`, nums);
          result.push(triangle);
          id++;

        } catch (err: any) {
          logger.warn({ row, err: err.message }, "Triangle: skipping row");
          continue;
        }
      }

    } catch (err: any) {
      logger.error({ path, err }, "readTriangles failed");

      if (err instanceof InvalidDataError) throw err;
      throw new InvalidDataError(
        `Unexpected error reading triangles from "${path}"`
      );
    }

    return result;
  }

  //  TETRAHEDRONS 

  readTetrahedrons(path: string) {
    const result: any[] = [];
    const validator = new TetrahedronValidator();
    const tetraFactory = new TetrahedronFactory();
    let id = 1;

    try {
      const safePath = this.safeResolve(path);

      let raw: string;
      try {
        raw = fs.readFileSync(safePath, "utf8");
      } catch (fsErr: any) {
        throw new InvalidDataError(
          `Cannot read tetrahedron file "${path}": ${fsErr.message}`
        );
      }

      const lines = raw.split("\n");

      for (const rawLine of lines) {
        const row = rawLine.trim();
        if (!row) continue;

        try {
          const nums = validator.parseRow(row);
          const points = validator.buildPoints(nums);
          validator.validatePoints(points);

          const tetra = tetraFactory.create(`S${id}`, nums);
          result.push(tetra);
          id++;

        } catch (err: any) {
          logger.warn({ row, err: err.message }, "Tetra: skipping row");
          continue;
        }
      }

    } catch (err: any) {
      logger.error({ path, err }, "readTetrahedrons failed");

      if (err instanceof InvalidDataError) throw err;
      throw new InvalidDataError(
        `Unexpected error reading tetrahedrons from "${path}"`
      );
    }

    return result;
  }
}
