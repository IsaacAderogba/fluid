export abstract class FluidType<T> {
  abstract merged(other: T): T;
  abstract equals(other: T): boolean;
  abstract toJSON(): object;
}
