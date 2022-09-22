function mockTest(shouldCall, cb) {
  if (shouldCall) {
    return cb(42);
  }
}

it("mock函数用法", () => {
  const mockFn = jest.fn();
  mockTest(true, mockFn);
  // 断言mock函数是否已经被调用了
  expect(mockFn).toHaveBeenCalled();
  // 被什么参数调用了
  expect(mockFn).toHaveBeenCalledWith(42);
  // 被调用了多少次
  expect(mockFn).toHaveBeenCalledTimes(1);

  // mock函数的入参：[ [ 42 ] ]
  // console.log(mockFn.mock.calls);
  // mock函数的结果：[ { type: 'return', value: undefined } ]
  // console.log(mockFn.mock.results);
});

it("mock函数的实现", () => {
  const mockFn = jest.fn((x) => x + 2);
  mockTest(true, mockFn);
  console.log(mockFn.mock.results);
  const mockFn1 = jest.fn().mockReturnValue(10);
  mockTest(true, mockFn1);
  console.log(mockFn1.mock.results);
});
