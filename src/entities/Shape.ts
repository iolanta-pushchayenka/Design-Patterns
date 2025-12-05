import { Observable } from "../observers/Observable";

export abstract class Shape extends Observable {
  constructor(
    public readonly id: string,
    public readonly name: string
  ) {
    super();
  }
}
