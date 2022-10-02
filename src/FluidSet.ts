import isEqual from "lodash.isequal";
import { FluidType } from "./FluidType";
import { Any, RequiredKeys } from "./types";

type LamportTimestamp = number;

type Metadata = {
  isDeleted: boolean;
  lamportTimestamp: LamportTimestamp;
};

const createMetadata = ({
  isDeleted = false,
  lamportTimestamp,
}: RequiredKeys<Metadata, "lamportTimestamp">) => ({
  lamportTimestamp,
  isDeleted,
});

type Entry<T> = {
  metadataByValue: Map<T, Metadata>;
  currentTimestamp: LamportTimestamp;
};

const createEntry = <T>({
  currentTimestamp = 0,
  metadataByValue = new Map(),
}: Partial<Entry<T>> = {}) => ({ currentTimestamp, metadataByValue });

export class FluidSet<T> extends FluidType<FluidSet<T>> {
  static create = <T>(entries?: T[]) => new FluidSet(entries);
  static fromJSON = <T = Any>(entry: Entry<T>) =>
    new FluidSet([], {
      currentTimestamp: entry.currentTimestamp,
      metadataByValue: new Map(Object.entries(entry.metadataByValue)),
    });

  entry: Entry<T>;
  private constructor(elements: T[] = [], entry?: Partial<Entry<T>>) {
    super();
    this.entry = createEntry(entry);
    elements.forEach((el) => this.add(el));
  }

  add(element: T) {
    this.entry.currentTimestamp++;

    const newMetadata = createMetadata({
      lamportTimestamp: this.entry.currentTimestamp,
    });
    const oldMetadata = this.entry.metadataByValue.get(element);

    this.entry.metadataByValue.set(element, newMetadata);

    const isNewInsert = oldMetadata ? oldMetadata.isDeleted : true;
    return isNewInsert;
  }

  equals(other: FluidSet<T>): boolean {
    return isEqual(this.entry, other.entry);
  }

  toJSON() {
    return {
      currentTimestamp: this.entry.currentTimestamp,
      metadataByValue: Object.fromEntries(this.entry.metadataByValue),
    };
  }
}
