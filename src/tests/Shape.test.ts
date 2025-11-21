import { Shape } from "../entities/Shape";

class TestShape extends Shape {}

describe("Shape entity", () => {
  it("id is assigned correctly", () => {
    const s = new TestShape("123");
    expect(s.id).toBe("123");
  });

  it("id is readonly at compile time (TS)", () => {
    const s = new TestShape("123");

    // @ts-expect-error — это проверка TypeScript времени компиляции
    s.id = "new";

    // В рантайме JS присвоение всё равно произойдёт — это норма.
    expect(s.id).toBe("new");
  });
});
