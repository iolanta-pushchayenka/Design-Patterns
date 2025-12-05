import * as fs from "fs";
import { FileReader } from "../readers/FileReader";
import { Warehouse } from "../warehouse/Warehouse";
import { triangleRepository, tetraRepository } from "../mainRepositories";

// Мокируем fs
jest.mock("fs");

describe("FileReader", () => {
  let reader: FileReader;
  let warehouse: Warehouse;

  beforeEach(() => {
    reader = new FileReader();
    warehouse = Warehouse.getInstance();
    warehouse.clear();
    triangleRepository.clear();
    tetraRepository.clear();

    // Мок safeResolve, чтобы не падала проверка BASE_DIR
    jest
      .spyOn(reader as any, "safeResolve")
      .mockImplementation((...args: any[]) => args[0] as string);
  });

  it("should read triangles and register them", () => {
    const fakeFileContent = `
0 0 3 0 0 4
1 1 4 1 1 5
`;
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValue(fakeFileContent);

    const result = reader.readTriangles("data/fakefile.txt");

    expect(result.length).toBe(2);

    const metrics1 = warehouse.get("T1");
    const metrics2 = warehouse.get("T2");

    // Проверяем первый треугольник (0,0),(3,0),(0,4) – площадь 6, периметр 12
    expect(metrics1?.area).toBeCloseTo(6);
    expect(metrics1?.perimeter).toBeCloseTo(12);

    // Проверяем второй треугольник (1,1),(4,1),(1,5) – площадь 6, периметр ~12.485
    expect(metrics2?.area).toBeCloseTo(6);
expect(metrics2?.perimeter).toBeCloseTo(12);
  });

  it("should skip invalid triangle rows", () => {
    const fakeFileContent = `
0 0 3 0 0 4
invalid,row
`;
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValue(fakeFileContent);

    const result = reader.readTriangles("data/fakefile.txt");

    expect(result.length).toBe(1);
    const metrics = warehouse.get("T1");
    expect(metrics?.area).toBeCloseTo(6);
    expect(metrics?.perimeter).toBeCloseTo(12);
  });

  it("should read tetrahedrons and register them", () => {
    const fakeFileContent = `
0 0 0 1 0 0 0 1 0 0 0 1
1 1 1 2 1 1 1 2 1 1 1 2
`;
    (fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>).mockReturnValue(fakeFileContent);

    const result = reader.readTetrahedrons("data/fakefile.txt");

    expect(result.length).toBe(2);

    const metrics1 = warehouse.get("S1");
    const metrics2 = warehouse.get("S2");

    expect(metrics1?.volume).toBeGreaterThan(0);
    expect(metrics2?.volume).toBeGreaterThan(0);
  });
});