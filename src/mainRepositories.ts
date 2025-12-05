import { FigureRepository } from "./repository/FigureRepository";
import { Triangle } from "./entities/TriangleEntity";
import { Tetrahedron } from "./entities/TetrahedronEntity";

export const triangleRepository = new FigureRepository<Triangle>();
export const tetraRepository = new FigureRepository<Tetrahedron>();


// import { Triangle } from "./entities/TriangleEntity";
// import { Tetrahedron } from "./entities/TetrahedronEntity";

class Repository<T> {
  private items: T[] = [];
  add(item: T) { this.items.push(item); }
  getAll(): T[] { return [...this.items]; }
  clear() { this.items = []; }
}

// export const triangleRepository = new Repository<Triangle>();
// export const tetraRepository = new Repository<Tetrahedron>();
