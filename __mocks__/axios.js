const axios = {
  get: jest.fn(() => Promise.resolve({ data: { username: "viking" } })),
};

module.exports = axios;
