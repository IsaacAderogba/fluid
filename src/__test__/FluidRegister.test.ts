import { FluidRegister } from "../FluidRegister";
import { expect, it } from "vitest";

it("Properly assigns register values", () => {
  const a = FluidRegister.create(1);
  expect(a.value).toEqual(1);

  a.value = 2;
  expect(a.value).toEqual(2);
});

it("merges values", () => {
  const a = FluidRegister.create(1);
  const b = FluidRegister.create(2);

  const c = a.merged(b);
  expect(c.value).toEqual(b.value);
});

it("merges with last change wins strategy based on timestamp", async () => {
  const a = FluidRegister.create(1);
  const b = FluidRegister.create(2);

  await new Promise((resolve) => setTimeout(resolve, 1));
  a.value = 3;
  const c = a.merged(b);
  expect(c.value).toEqual(a.value);
});

it("merges associatively", () => {
  const a = FluidRegister.create(1);
  const b = FluidRegister.create(2);
  const c = FluidRegister.create(3);

  const e = a.merged(b).merged(c);
  const f = a.merged(b.merged(c));
  expect(e.value).toEqual(f.value);
});

it("merges commutatively", () => {
  const a = FluidRegister.create(1);
  const b = FluidRegister.create(2);

  const c = a.merged(b);
  const d = b.merged(a);
  expect(c.value).toEqual(d.value);
});

it("merges idempotently", () => {
  const a = FluidRegister.create(1);
  const b = FluidRegister.create(2);

  const c = a.merged(b);
  const d = c.merged(b);
  const e = c.merged(a);
  expect(c.value).toEqual(d.value);
  expect(c.value).toEqual(e.value);
});

it("JSON encodes and decodes", () => {
  const a = FluidRegister.create(1);

  const aEncoded = JSON.stringify(a.toJSON());
  const aDecoded = FluidRegister.fromJSON(JSON.parse(aEncoded));

  expect(a.equals(aDecoded)).toBeTruthy();
});
