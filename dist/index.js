import { FileReader } from "./readers/FileReader";
import { TriangleCalculator } from "./services/TriangleCalculator";
import { TetrahedronCalculator } from "./services/TetrahedronCalculator";
console.log("=== TRIANGLES ===");
const triangles = FileReader.readTriangles("data/triangles.txt");
for (const t of triangles) {
    console.log(t.id, "area:", TriangleCalculator.area(t));
}
console.log("=== TETRAHEDRONS ===");
const tets = FileReader.readTetrahedrons("data/tetrahedrons.txt");
for (const t of tets) {
    console.log(t.id, "volume:", TetrahedronCalculator.volume(t));
}
