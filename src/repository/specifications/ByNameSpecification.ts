// import { Specification } from "./Specification";

// export class ByNameSpecification<T extends { name: string }> implements Specification<T> {
//     constructor(private readonly target: string) {}

//     isSatisfiedBy(item: T): boolean {
//         return item.name === this.target;
//     }
// }

import { Specification } from "./Specification";

export class ByNameSpecification<T extends { name: string }> implements Specification<T> {
    constructor(private readonly target: string) {}

    isSatisfiedBy(item: T): boolean {
        return item.name === this.target;
    }
}
