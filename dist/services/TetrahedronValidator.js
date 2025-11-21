export const TETRA_ROW_REGEX = /^-?\d+(\.\d+)?(\s+-?\d+(\.\d+)?){11}$/;
export class TetrahedronValidator {
    static validateRawString(row) {
        return TETRA_ROW_REGEX.test(row.trim());
    }
    static isNonDegenerate(a, b, c, d) {
        const v1 = this.vec(a, b);
        const v2 = this.vec(a, c);
        const v3 = this.vec(a, d);
        const cross = this.cross(v1, v2);
        const det = this.dot(cross, v3);
        return Math.abs(det) > 1e-6;
    }
    static vec(p, q) {
        return { x: q.x - p.x, y: q.y - p.y, z: q.z - p.z };
    }
    static cross(a, b) {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x
        };
    }
    static dot(a, b) {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }
}
