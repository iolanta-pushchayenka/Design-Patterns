export class TetrahedronCalculator {
    static vec(a, b) {
        return { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    }
    static cross(u, v) {
        return {
            x: u.y * v.z - u.z * v.y,
            y: u.z * v.x - u.x * v.z,
            z: u.x * v.y - u.y * v.x,
        };
    }
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
    static triangleArea(a, b, c) {
        const ab = this.vec(a, b);
        const ac = this.vec(a, c);
        const cross = this.cross(ab, ac);
        return 0.5 * Math.sqrt(Math.pow(cross.x, 2) + Math.pow(cross.y, 2) + Math.pow(cross.z, 2));
    }
    static volume(t) {
        const ab = this.vec(t.p1, t.p2);
        const ac = this.vec(t.p1, t.p3);
        const ad = this.vec(t.p1, t.p4);
        const cross = this.cross(ab, ac);
        const det = this.dot(cross, ad);
        return Math.abs(det) / 6;
    }
    static surfaceArea(t) {
        return (this.triangleArea(t.p1, t.p2, t.p3) +
            this.triangleArea(t.p1, t.p2, t.p4) +
            this.triangleArea(t.p1, t.p3, t.p4) +
            this.triangleArea(t.p2, t.p3, t.p4));
    }
    static baseLiesOnPlane(t) {
        const z1 = t.p1.z;
        const z2 = t.p2.z;
        const z3 = t.p3.z;
        return z1 === 0 && z2 === 0 && z3 === 0;
    }
}
