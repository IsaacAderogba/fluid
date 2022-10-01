export interface Replicable<T> {
  merged(other: T): T;
  equals(other: T): boolean
}
