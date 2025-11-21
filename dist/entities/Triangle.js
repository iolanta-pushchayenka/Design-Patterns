import { Shape } from "./Shape";
export class Triangle extends Shape {
    constructor(id, a, b, c) {
        super(id);
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
