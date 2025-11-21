import { FileReader } from "./readers/FileReader";
import { TriangleCalculator } from "./services/TriangleCalculator";
import { TetrahedronCalculator } from "./services/TetrahedronCalculator";

console.log("TRIANGLES:");
const triangles = FileReader.readTriangles("data/triangles.txt");
for (const t of triangles) {
  console.log(t.id, "Площадь треугольника:", TriangleCalculator.area(t));
  console.log(t.id, "Периметр:", TriangleCalculator.perimeter(t));
  console.log(t.id, "Является ли треугольник равнобедренным:", TriangleCalculator.isIsosceles(t));
  console.log(t.id, "Является ли треугольник равносторонним:", TriangleCalculator.isEquilateral(t));
  console.log(t.id, "Является ли треугольник прямоугольным:", TriangleCalculator.isRight(t));
  console.log(t.id, "Остроугольный:", TriangleCalculator.isAcute(t));
  console.log(t.id, "Тупоугольный:", TriangleCalculator.isObtuse(t));
  console.log(t.id, "Корректный:", TriangleCalculator.isValidTriangle(t));
}

console.log("TETRAHEDRONS:");

const tetrahedrons = FileReader.readTetrahedrons("data/tetrahedrons.txt");

for (const t of tetrahedrons) {
  console.log(t.id, "Корректный тетраэдр:", TetrahedronCalculator.isValid(t));
  console.log(t.id, "Объём:", TetrahedronCalculator.volume(t));
  console.log(t.id, "Площадь поверхности:", TetrahedronCalculator.surfaceArea(t));
  
  const planes = TetrahedronCalculator.baseLiesOnCoordinatePlane(t);
  console.log(t.id, "Основание на плоскости XY:", planes.XY);
  console.log(t.id, "Основание на плоскости YZ:", planes.YZ);
  console.log(t.id, "Основание на плоскости XZ:", planes.XZ);

  const ratioXY = TetrahedronCalculator.volumeRatio(t, "XY");
  console.log(t.id, "Соотношение объёмов при рассечении плоскостью XY:", ratioXY);

  const ratioYZ = TetrahedronCalculator.volumeRatio(t, "YZ");
  console.log(t.id, "Соотношение объёмов при рассечении плоскостью YZ:", ratioYZ);

  const ratioXZ = TetrahedronCalculator.volumeRatio(t, "XZ");
  console.log(t.id, "Соотношение объёмов при рассечении плоскостью XZ:", ratioXZ);
}


