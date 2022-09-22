const axios = require("axios");
module.exports = function getUserName(id) {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then((resp) => {
      return resp.data;
    });
};
