export class SortByPointX {
    static compare(a: any, b: any): number {
        const x1 = a.a?.x ?? a.p1?.x;
        const x2 = b.a?.x ?? b.p1?.x;
        return x1 - x2;
    }
}
