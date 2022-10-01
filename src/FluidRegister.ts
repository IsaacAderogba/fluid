import isEqual from "lodash.isequal";
import { v1 as uuid } from "uuid";
import { Replicable } from "./Interfaces";
import { Any, RequiredKeys } from "./types";

type Entry<T> = {
  id: string;
  timestamp: number;
  value: T;
};

const createEntry = <T>({
  id = uuid(),
  timestamp = Date.now(),
  value,
}: RequiredKeys<Entry<T>, "value">) => ({ id, timestamp, value });

export class FluidRegister<T> implements Replicable<FluidRegister<T>> {
  static create = <T>(value: T) => new FluidRegister({ value });
  static fromJSON = <T = Any>(entry: Entry<T>) => new FluidRegister(entry);

  private entry: Entry<T>;
  private constructor(entry: RequiredKeys<Entry<T>, "value">) {
    this.entry = createEntry(entry);
  }

  get value(): T {
    return this.entry.value;
  }

  set value(value: T) {
    this.entry = createEntry({ value });
  }

  private isOrdered<E>({ entry }: FluidRegister<E>): boolean {
    if (this.entry.timestamp !== entry.timestamp) {
      return this.entry.timestamp > entry.timestamp;
    }

    return this.entry.id > entry.id;
  }

  merged(other: FluidRegister<T>): FluidRegister<T> {
    return this.isOrdered(other) ? this : other;
  }

  equals(other: FluidRegister<T>): boolean {
    return isEqual(this.entry, other.entry);
  }

  toJSON() {
    return this.entry;
  }
}
