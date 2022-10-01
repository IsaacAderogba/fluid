import { v1 as uuid } from "uuid";
import { Replicable } from "./Replicable";

class Entry<T> {
  id = uuid();
  timestamp = Date.now();
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  isOrdered<E>({ timestamp, id }: Entry<E>): boolean {
    if (this.timestamp !== timestamp) {
      return this.timestamp > timestamp;
    }

    return this.id > id;
  }
}

export class FluidRegister<T>
  implements Replicable<FluidRegister<T>>
{
  private entry: Entry<T>;

  constructor(input: T) {
    this.entry = new Entry(input);
  }

  get value() {
    return this.entry.value;
  }

  set value(input: T) {
    this.entry = new Entry(input);
  }

  merged(other: FluidRegister<T>): FluidRegister<T> {
    return this.entry.isOrdered(other.entry) ? this : other;
  }
}
