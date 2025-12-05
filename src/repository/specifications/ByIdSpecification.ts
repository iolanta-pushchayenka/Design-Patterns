import { Specification } from "./Specification";

export class ByIdSpecification<T extends { id: string }> implements Specification<T> {
    constructor(private readonly targetId: string) {}

    isSatisfiedBy(item: T): boolean {
        return item.id === this.targetId;
    }
}
