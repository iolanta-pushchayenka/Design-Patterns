import { FileReader } from "../readers/FileReader";
import { TriangleCalculator } from "../services/TriangleCalculator";
import { TetrahedronCalculator } from "../services/TetrahedronCalculator";

// Мокаем console.log, чтобы не засорять вывод
const logMock = jest.spyOn(console, "log").mockImplementation(() => {});

// Мокаем FileReader
jest.mock("../readers/FileReader", () => ({
  FileReader: {
    readTriangles: jest.fn(),
    readTetrahedrons: jest.fn()
  }
}));

// Мокаем TriangleCalculator
jest.mock("../services/TriangleCalculator", () => ({
  TriangleCalculator: {
    area: jest.fn(),
    perimeter: jest.fn(),
    isIsosceles: jest.fn(),
    isEquilateral: jest.fn(),
    isRight: jest.fn(),
    isAcute: jest.fn(),
    isObtuse: jest.fn(),
    isValidTriangle: jest.fn()
  }
}));

// Мокаем TetrahedronCalculator
jest.mock("../services/TetrahedronCalculator", () => ({
  TetrahedronCalculator: {
    isValid: jest.fn(),
    volume: jest.fn(),
    surfaceArea: jest.fn(),
    baseLiesOnCoordinatePlane: jest.fn(),
    volumeRatio: jest.fn()
  }
}));

describe("Главный сценарий приложения", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("скрипт читает данные и вызывает все функции калькуляторов", () => {
    // -----------------------------------
    // 1. Настраиваем моки
    // -----------------------------------
    const fakeTriangle = { id: "T1" };
    const fakeTetra = { id: "S1" };

    (FileReader.readTriangles as jest.Mock).mockReturnValue([fakeTriangle]);
    (FileReader.readTetrahedrons as jest.Mock).mockReturnValue([fakeTetra]);

    (TriangleCalculator.area as jest.Mock).mockReturnValue(10);
    (TriangleCalculator.perimeter as jest.Mock).mockReturnValue(20);
    (TriangleCalculator.isIsosceles as jest.Mock).mockReturnValue(true);
    (TriangleCalculator.isEquilateral as jest.Mock).mockReturnValue(false);
    (TriangleCalculator.isRight as jest.Mock).mockReturnValue(false);
    (TriangleCalculator.isAcute as jest.Mock).mockReturnValue(true);
    (TriangleCalculator.isObtuse as jest.Mock).mockReturnValue(false);
    (TriangleCalculator.isValidTriangle as jest.Mock).mockReturnValue(true);

    (TetrahedronCalculator.isValid as jest.Mock).mockReturnValue(true);
    (TetrahedronCalculator.volume as jest.Mock).mockReturnValue(100);
    (TetrahedronCalculator.surfaceArea as jest.Mock).mockReturnValue(50);
    (TetrahedronCalculator.baseLiesOnCoordinatePlane as jest.Mock).mockReturnValue({
      XY: true,
      YZ: false,
      XZ: true
    });
    (TetrahedronCalculator.volumeRatio as jest.Mock).mockReturnValue(0.5);

    // -----------------------------------
    // 2. Импортируем скрипт (он сразу выполняется)
    // -----------------------------------
    require("../index"); // путь укажи по своему проекту

    // -----------------------------------
    // 3. Проверяем, что функции были вызваны
    // -----------------------------------

    expect(FileReader.readTriangles).toHaveBeenCalledWith("data/triangles.txt");
    expect(FileReader.readTetrahedrons).toHaveBeenCalledWith("data/tetrahedrons.txt");

    // TriangleCalculator
    expect(TriangleCalculator.area).toHaveBeenCalledWith(fakeTriangle);
    expect(TriangleCalculator.perimeter).toHaveBeenCalledWith(fakeTriangle);
    expect(TriangleCalculator.isIsosceles).toHaveBeenCalledWith(fakeTriangle);
    expect(TriangleCalculator.isEquilateral).toHaveBeenCalledWith(fakeTriangle);
    expect(TriangleCalculator.isRight).toHaveBeenCalledWith(fakeTriangle);
    expect(TriangleCalculator.isAcute).toHaveBeenCalledWith(fakeTriangle);
    expect(TriangleCalculator.isObtuse).toHaveBeenCalledWith(fakeTriangle);
    expect(TriangleCalculator.isValidTriangle).toHaveBeenCalledWith(fakeTriangle);

    // TetrahedronCalculator
    expect(TetrahedronCalculator.isValid).toHaveBeenCalledWith(fakeTetra);
    expect(TetrahedronCalculator.volume).toHaveBeenCalledWith(fakeTetra);
    expect(TetrahedronCalculator.surfaceArea).toHaveBeenCalledWith(fakeTetra);
    expect(TetrahedronCalculator.baseLiesOnCoordinatePlane).toHaveBeenCalledWith(fakeTetra);
    expect(TetrahedronCalculator.volumeRatio).toHaveBeenCalledTimes(3);
    expect(TetrahedronCalculator.volumeRatio).toHaveBeenCalledWith(fakeTetra, "XY");
    expect(TetrahedronCalculator.volumeRatio).toHaveBeenCalledWith(fakeTetra, "YZ");
    expect(TetrahedronCalculator.volumeRatio).toHaveBeenCalledWith(fakeTetra, "XZ");

    // Проверяем, что что-то выводилось
    expect(logMock).toHaveBeenCalled();
  });
});
