import { Shape } from "./Shape";
export class Tetrahedron extends Shape {
    constructor(id, p1, p2, p3, p4) {
        super(id);
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
    }
}
