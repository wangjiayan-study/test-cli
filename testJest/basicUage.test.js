function sum(a, b) {
  return a + b;
}
test("测试同步方法", () => {
  expect(sum(1, 2)).toBe(3);
});

const usePromise = () => Promise.resolve("hello");
it("测试promise", () => {
  return usePromise().then((data) => {
    expect(data).toBe("hello");
  });
});
it("测试promise，写法2", () => {
  return expect(usePromise()).resolves.toBe("hello");
});

it("测试async ", async () => {
  const data = await usePromise();
  expect(data).toBe("hello");
});
