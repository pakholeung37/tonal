import { describe, expect, test } from "vitest";
import ScaleDictionary from "./scale-dictionary";
import ScaleType from "./scale-type";

describe("./scale-dictionary", () => {
  test("alias of ScaleType", () => {
    expect(ScaleDictionary).toEqual(ScaleType);
  });
});
