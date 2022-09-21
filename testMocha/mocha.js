var assert = require("assert");

async function asyncFn() {
  console.log("asyncFn");
  return 1;
}

describe("数组", function () {
  describe("#indexOf()", function () {
    it("should return -1 when the value is not present", function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe("异步方法", function () {
  it("它会返回1", function (done) {
    asyncFn().then((res) => {
      assert.strictEqual(res, 1);
      done();
    });
  });
});
