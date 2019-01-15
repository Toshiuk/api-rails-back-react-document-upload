const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/*", { target: "https://dry-harbor-76275.herokuapp.com" }));
};
