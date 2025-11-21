import ValidationError from '../errors/ValidationError';
export default class TriangleValidator {
    static notCollinear(tri) {
        const { a, b, c } = tri;
        const area2 = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
        if (Math.abs(area2) < 1e-9) {
            throw new ValidationError('Triangle points are collinear');
        }
        return true;
    }
}
