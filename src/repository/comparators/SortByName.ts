import { Shape } from "../../entities/Shape";

export class SortByName {
    static compare(a: Shape, b: Shape): number {
        return a.name.localeCompare(b.name);
    }
}
