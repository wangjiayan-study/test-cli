const getUserName = require("./user");
// const axios = require("axios");
// jest.mock("axios"); // 接管axios的实现

// // 模拟get的实现
// axios.get.mockImplementation(() => {
//   return Promise.resolve({ data: [{ id: 1 }] });
// });

it("mock第三方模块", () => {
  getUserName(1).then((data) => {
    console.log("data", data);
    // 被调用axios.get
    // expect(axios.get).toHaveBeenCalled();
  });
});
