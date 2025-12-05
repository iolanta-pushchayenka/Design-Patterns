import { FileReader } from "./readers/FileReader";

import { triangleRepository, tetraRepository} from "./mainRepositories";
import { Warehouse } from "./warehouse/Warehouse";

import { SortById } from "./repository/comparators/SortById";
import { SortByPointX } from "./repository/comparators/SortByPointX";
import { SortByPointY } from "./repository/comparators/SortByPointY";
import { SortByName } from "./repository/comparators/SortByName";

import { ByIdSpecification } from "./repository/specifications/ByIdSpecification";
import { ByNameSpecification } from "./repository/specifications/ByNameSpecification";
import { ByAreaRangeSpecification } from "./repository/specifications/ByAreaRangeSpecification";

import { TriangleCalculator } from "./services/TriangleCalculator";
import { TetrahedronCalculator } from "./services/TetrahedronCalculator";

import { ByCoordinatesSpecification } from "./repository/specifications/ByCoordinatesSpecification";
import { ByDistanceSpecification } from "./repository/specifications/ByDistanceSpecification";


console.log("====== ТЕСТ ЗАДАНИЯ TASK II ======");

const reader = new FileReader();
const warehouse = Warehouse.getInstance();

const triCalc = new TriangleCalculator();
const tetCalc = new TetrahedronCalculator();


// ---------------------------------------------------------
// 1) ЧТЕНИЕ ФАЙЛОВ
// ---------------------------------------------------------

console.log("\n== ЧТЕНИЕ ТРЕУГОЛЬНИКОВ ==");
reader.readTriangles("data/triangles.txt");

console.log("\n== ЧТЕНИЕ ТЕТРАЭДРОВ ==");
reader.readTetrahedrons("data/tetrahedrons.txt");

console.log("\nТреугольников загружено:", triangleRepository.getAll().length);
console.log("Тетраэдров загружено:", tetraRepository.getAll().length);


// ---------------------------------------------------------
// 2) ПРОВЕРКА REPOSITORY
// ---------------------------------------------------------

console.log("\n== ПРОВЕРКА РЕПОЗИТОРИЯ ==");

console.log("Треугольник:", triangleRepository.getAll());
console.log("Тетраэдр:", tetraRepository.getAll());


// ---------------------------------------------------------
// 3) ПРОВЕРКА SORTING (Comparator)
// ---------------------------------------------------------

console.log("\n== СОРТИРОВКА ==");

//Треугольник
console.log("Сортировка треугольников по ID:");;
console.log(triangleRepository.sort(SortById));

console.log("Сортировка треугольников по name:");;
console.log(triangleRepository.sort(SortByName.compare));

console.log("Сортировка треугольников по X первой точки:");
console.log(triangleRepository.sort(SortByPointX.compare));


console.log("Сортировка треугольников по Y первой точки:");
console.log(triangleRepository.sort(SortByPointY.compare));

//Тетраэдр

console.log("Сортировка тетраэдров по ID:");;
console.log( tetraRepository.sort(SortById));

console.log("Сортировка тетраэдров по name:");;
console.log( tetraRepository.sort(SortByName.compare));

console.log("Сортировка тетраэдров по X первой точки:");
console.log( tetraRepository.sort(SortByPointX.compare));


console.log("Сортировка тетраэдров по Y первой точки:");
console.log( tetraRepository.sort(SortByPointY.compare));

// ---------------------------------------------------------
// 4) ПРОВЕРКА SPECIFICATIONS (поиск в репозитории)
// ---------------------------------------------------------

console.log("\n== СПЕЦИФИКАЦИИ ==");

console.log("Поиск треугольника по ID T1:");
console.log(triangleRepository.query(new ByIdSpecification("T1")));

console.log("Поиск треугольников по имени 'Triangle_T2':");
console.log(triangleRepository.query(new ByNameSpecification("Triangle_T2")));


console.log("Поиск треугольников по площади 0–100:");
console.log(triangleRepository.query(new ByAreaRangeSpecification(0, 100))); 

console.log("Фигуры в первом квадранте:");
console.log(triangleRepository.query(new ByCoordinatesSpecification(0, 999, 0, 999, 0, 999)));

console.log("Фигуры в расстоянии 0–10 от начала координат:");
console.log(triangleRepository.query(new ByDistanceSpecification(0, 10)))



// ---------------------------------------------------------
// 5) ПРОВЕРКА WAREHOUSE
// ---------------------------------------------------------

console.log("\n== WAREHOUSE ==");

console.log("Содержимое Warehouse:");
console.log(warehouse.dump());// подчеркивает красным 


// ---------------------------------------------------------
// 5) ПРОВЕРКА ADD / REMOVE
// ---------------------------------------------------------

console.log("\n== ADD / REMOVE ==");

const testTriangle = triangleRepository.getAll()[0];

console.log("Кол-во до добавления:", triangleRepository.getAll().length);

triangleRepository.add(testTriangle);

console.log("После добавления:", triangleRepository.getAll().length);

triangleRepository.removeById(testTriangle.id);

console.log("После удаления по ID:", triangleRepository.getAll().length);

// восстановить исходное состояние
triangleRepository.add(testTriangle);


// ---------------------------------------------------------
// 6) ПРОВЕРКА OBSERVER (пересчёт при изменении фигуры)
// ---------------------------------------------------------

console.log("\n== OBSERVER ==");

const tri = triangleRepository.getAll()[0];

console.log("Площадь до изменения:", warehouse.getTriangleArea(tri.id));// подчеркивает красным 


console.log("Меняем координату A...");
tri.setA({ x: tri.a.x + 3, y: tri.a.y + 2, z: tri.a.z });

console.log("Площадь после изменения:", warehouse.getTriangleArea(tri.id));// подчеркивает красным 



// ---------------------------------------------------------
// 7) ПРОВЕРКА КАЛЬКУЛЯТОРОВ
// ---------------------------------------------------------

console.log("\n== КАЛЬКУЛЯТОРЫ ==");

for (const t of triangleRepository.getAll()) {
  console.log(`\nTriangle ${t.id}`);
  console.log("Площадь:", triCalc.area(t));
  console.log("Периметр:", triCalc.perimeter(t));
  console.log("Равносторонний:", triCalc.isEquilateral(t));
}

for (const t of tetraRepository.getAll()) {
  console.log(`\nTetrahedron ${t.id}`);
  console.log("Объём:", tetCalc.volume(t));
  console.log("Площадь поверхности:", tetCalc.surfaceArea(t));
}

console.log("\n====== ВСЕ ТЕСТЫ ВЫПОЛНЕНЫ ======");
