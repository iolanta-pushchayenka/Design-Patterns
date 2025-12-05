export class SortByPointY {
    static compare(a: any, b: any): number {
        const y1 = a.a?.y ?? a.p1?.y;
        const y2 = b.a?.y ?? b.p1?.y;
        return y1 - y2;
    }
}
