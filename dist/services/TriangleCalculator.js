export class TriangleCalculator {
    static dist(p, q) {
        return Math.sqrt(Math.pow((p.x - q.x), 2) + Math.pow((p.y - q.y), 2));
    }
    static perimeter(t) {
        const ab = this.dist(t.a, t.b);
        const bc = this.dist(t.b, t.c);
        const ca = this.dist(t.c, t.a);
        return ab + bc + ca;
    }
    static area(t) {
        return Math.abs(t.a.x * (t.b.y - t.c.y) +
            t.b.x * (t.c.y - t.a.y) +
            t.c.x * (t.a.y - t.b.y)) / 2;
    }
    static isIsosceles(t) {
        const d = [
            this.dist(t.a, t.b),
            this.dist(t.b, t.c),
            this.dist(t.c, t.a),
        ];
        return (Math.abs(d[0] - d[1]) < 1e-6 ||
            Math.abs(d[1] - d[2]) < 1e-6 ||
            Math.abs(d[2] - d[0]) < 1e-6);
    }
    static isEquilateral(t) {
        const d = [
            this.dist(t.a, t.b),
            this.dist(t.b, t.c),
            this.dist(t.c, t.a),
        ];
        return (Math.abs(d[0] - d[1]) < 1e-6 &&
            Math.abs(d[1] - d[2]) < 1e-6);
    }
    static isRight(t) {
        const d = [
            this.dist(t.a, t.b),
            this.dist(t.b, t.c),
            this.dist(t.c, t.a),
        ].map((x) => Math.pow(x, 2)).sort((a, b) => a - b);
        return Math.abs(d[0] + d[1] - d[2]) < 1e-6;
    }
}
