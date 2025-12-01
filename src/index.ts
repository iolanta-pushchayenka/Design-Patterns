import { FileReader } from "./readers/FileReader";
import { TriangleCalculator } from "./services/TriangleCalculator";
import { TetrahedronCalculator } from "./services/TetrahedronCalculator";

console.log("TRIANGLES:");

const reader = new FileReader();

const triCalc = new TriangleCalculator();
const tetCalc = new TetrahedronCalculator();

const triangles = reader.readTriangles("data/triangles.txt");

for (const t of triangles) {
  console.log(t.id, "Площадь:", triCalc.area(t));
  console.log(t.id, "Периметр:", triCalc.perimeter(t));
  console.log(t.id, "Равнобедренный:", triCalc.isIsosceles(t));
  console.log(t.id, "Равносторонний:", triCalc.isEquilateral(t));
  console.log(t.id, "Прямоугольный:", triCalc.isRight(t));
  console.log(t.id, "Остроугольный:", triCalc.isAcute(t));
  console.log(t.id, "Тупоугольный:", triCalc.isObtuse(t));
  console.log(t.id, "Корректный:", triCalc.isValidTriangle(t));
}

console.log("TETRAHEDRONS:");

const tetrahedrons = reader.readTetrahedrons("data/tetrahedrons.txt");

for (const t of tetrahedrons) {
  console.log(t.id, "Корректный:", tetCalc.isValid(t));
  console.log(t.id, "Объём:", tetCalc.volume(t));
  console.log(t.id, "Площадь поверхности:", tetCalc.surfaceArea(t));

  const planes = tetCalc.baseLiesOnCoordinatePlane(t);
  console.log(t.id, "На XY:", planes.XY);
  console.log(t.id, "На YZ:", planes.YZ);
  console.log(t.id, "На XZ:", planes.XZ);

  console.log(t.id, "Ratio XY:", tetCalc.volumeRatio(t, "XY"));
  console.log(t.id, "Ratio YZ:", tetCalc.volumeRatio(t, "YZ"));
  console.log(t.id, "Ratio XZ:", tetCalc.volumeRatio(t, "XZ"));
}
