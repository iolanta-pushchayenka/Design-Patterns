import type { Specification } from "./specifications/Specification";

export class FigureRepository<T> {
    private items: T[] = [];

    clear(): void {
        this.items = [];
    }


    add(item: T): void {
        this.items.push(item);
    }

    addMany(items: T[]): void {
        this.items.push(...items);
    }

    removeById(id: string): void {
        this.items = this.items.filter((x: any) => x.id !== id);
    }


    getAll(): T[] {
        return [...this.items]; 
        }

    query(spec: Specification<T>): T[] {
        return this.items.filter(item => spec.isSatisfiedBy(item));
    }

    sort(compareFn: (a: T, b: T) => number): T[] {
        return [...this.items].sort(compareFn);
    }
}
