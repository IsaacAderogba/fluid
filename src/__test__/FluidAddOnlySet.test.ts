import { FluidAddOnlySet } from "../FluidAddOnlySet";
import { expect, it } from "vitest";

it("assigns set values", () => {
  const a = FluidAddOnlySet.create([1, 2]);

  expect(a.values).toEqual(new Set([1, 2]));
});

it("adds values to an existing set", () => {
  const a = FluidAddOnlySet.create([1, 2]);
  a.add(5);

  expect(a.values).toEqual(new Set([1, 2, 5]));
});

it("merges values", () => {
  const a = FluidAddOnlySet.create([1, 2]);
  const b = FluidAddOnlySet.create([5]);

  const c = a.merged(b);
  expect(c.values).toEqual(new Set([1, 2, 5]));
});

it("merges associatively", () => {
  const a = FluidAddOnlySet.create([1, 2]);
  const b = FluidAddOnlySet.create([5]);
  const c = FluidAddOnlySet.create([1, 2, 3]);

  const e = a.merged(b).merged(c);
  const f = a.merged(b.merged(c));
  expect(e.values).toEqual(f.values);
});

it("merges commutatively", () => {
  const a = FluidAddOnlySet.create([1, 2]);
  const b = FluidAddOnlySet.create([5]);

  const c = a.merged(b);
  const d = b.merged(a);
  expect(c.values).toEqual(d.values);
});

it("merges idempotently", () => {
    const a = FluidAddOnlySet.create([1, 2]);
    const b = FluidAddOnlySet.create([5]);
  
    const c = a.merged(b);
    const d = c.merged(b);
    const e = c.merged(a);
    expect(c.values).toEqual(d.values);
    expect(c.values).toEqual(e.values);
  });

it("JSON encodes and decodes", () => {
  const a = FluidAddOnlySet.create([1]);

  const aEncoded = JSON.stringify(a.toJSON());
  const aDecoded = FluidAddOnlySet.fromJSON(JSON.parse(aEncoded));

  expect(a.equals(aDecoded)).toBeTruthy();
});
