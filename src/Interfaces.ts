export interface FluidType<T> {
  merged(other: T): T;
  equals(other: T): boolean;
  toJSON(): object;
}
