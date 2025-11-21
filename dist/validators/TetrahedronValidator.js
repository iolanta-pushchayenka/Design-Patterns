import ValidationError from '../errors/ValidationError';
export default class TetrahedronValidator {
    static nonCoplanar(tet) {
        var _a, _b, _c, _d, _e, _f;
        const { a, b, c, d } = tet;
        const AB = [b.x - a.x, b.y - a.y, ((_a = b.z) !== null && _a !== void 0 ? _a : 0) - ((_b = a.z) !== null && _b !== void 0 ? _b : 0)];
        const AC = [c.x - a.x, c.y - a.y, ((_c = c.z) !== null && _c !== void 0 ? _c : 0) - ((_d = a.z) !== null && _d !== void 0 ? _d : 0)];
        const AD = [d.x - a.x, d.y - a.y, ((_e = d.z) !== null && _e !== void 0 ? _e : 0) - ((_f = a.z) !== null && _f !== void 0 ? _f : 0)];
        const cross = [
            AB[1] * AC[2] - AB[2] * AC[1],
            AB[2] * AC[0] - AB[0] * AC[2],
            AB[0] * AC[1] - AB[1] * AC[0]
        ];
        const dot = cross[0] * AD[0] + cross[1] * AD[1] + cross[2] * AD[2];
        if (Math.abs(dot) < 1e-9) {
            throw new ValidationError('Tetrahedron points are coplanar');
        }
        return true;
    }
}
