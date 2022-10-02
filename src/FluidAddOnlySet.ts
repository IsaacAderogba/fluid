import isEqual from "lodash.isequal";
import { FluidType } from "./FluidType";
import { Any } from "./types";

export class FluidAddOnlySet<T> extends FluidType<FluidAddOnlySet<T>> {
  static create = <T>(entries?: T[]) => new FluidAddOnlySet(entries);
  static fromJSON = <T = Any>(entries: T[]) =>
    new FluidAddOnlySet(entries);

  private entries: Set<T>;
  private constructor(entries: T[] = []) {
    super()
    this.entries = new Set(entries);
  }

  get values(): Set<T> {
    return this.entries;
  }

  add(entry: T) {
    this.entries.add(entry);
  }

  equals(other: FluidAddOnlySet<T>): boolean {
    return isEqual(this.entries, other.entries);
  }

  merged(other: FluidAddOnlySet<T>): FluidAddOnlySet<T> {
    return new FluidAddOnlySet([...this.entries, ...other.entries]);
  }

  toJSON() {
    return Array.from(this.entries);
  }
}
