export interface Replicable<T> {
  merged(other: T): T;
}
