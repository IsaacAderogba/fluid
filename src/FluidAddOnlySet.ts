import isEqual from "lodash.isequal";
import { FluidType } from "./Interfaces";
import { Any } from "./types";

export class FluidAddOnlySet<T> implements FluidType<FluidAddOnlySet<T>> {
  static create = <T>(entries?: Set<T>) => new FluidAddOnlySet(entries);
  static fromJSON = <T = Any>(entries: T[]) =>
    new FluidAddOnlySet(new Set(entries));

  private entries: Set<T>;
  private constructor(entries = new Set<T>()) {
    this.entries = entries;
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
    const set = new Set([...this.entries, ...other.entries]);
    return new FluidAddOnlySet(set);
  }

  toJSON() {
    return Array.from(this.entries);
  }
}
