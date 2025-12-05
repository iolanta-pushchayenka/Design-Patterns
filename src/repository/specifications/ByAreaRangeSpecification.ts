// import { Specification } from "./Specification";

// export class ByAreaRangeSpecification<T extends { area: number }> implements Specification<T> {
//     constructor(
//         private readonly min: number,
//         private readonly max: number
//     ) {}

//     isSatisfiedBy(item: T): boolean {
//         return item.area >= this.min && item.area <= this.max;
//     }
// }


import { Specification } from "./Specification";
import { Warehouse } from "../../warehouse/Warehouse";

export class ByAreaRangeSpecification<T extends { id: string }> implements Specification<T> {
    private warehouse = Warehouse.getInstance();

    constructor(
        private readonly min: number,
        private readonly max: number
    ) {}

    isSatisfiedBy(item: T): boolean {
        const area = this.warehouse.getTriangleArea(item.id);
        if (area === undefined) return false;
        return area >= this.min && area <= this.max;
    }
}
