import { DecimalFixedPipe } from "./decimal-fixed.pipe";

describe("DecimalFixedPipe", () => {
  it("create an instance", () => {
    const pipe = new DecimalFixedPipe();
    expect(pipe).toBeTruthy();
  });
});
