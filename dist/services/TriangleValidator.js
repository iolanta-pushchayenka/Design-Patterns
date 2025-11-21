export const TRIANGLE_ROW_REGEX = /^-?\d+(\.\d+)?(\s+-?\d+(\.\d+)?){5}$/;
export class TriangleValidator {
    static validateRawString(row) {
        return TRIANGLE_ROW_REGEX.test(row.trim());
    }
    static areNotCollinear(a, b, c) {
        const area = Math.abs(a.x * (b.y - c.y) +
            b.x * (c.y - a.y) +
            c.x * (a.y - b.y)) / 2;
        return area > 0;
    }
}
