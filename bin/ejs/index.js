const ejs = require("ejs");
const path = require("node:path");
const html = "<div><%= user.name %></div>";
const options = {};
const data = {
  user: {
    name: "liugezhou",
    path: path.resolve(process.cwd(), __dirname),
  },
};

const template = ejs.compile(html, options);
const compiletemplate = template(data);
console.log("compiletemplate", compiletemplate);
