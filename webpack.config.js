const prodConfig = require("./config/webpack.prod.js");
const devConfig = require("./config/webpack.dev.js");

module.exports = (env) => {
  return env.production ? prodConfig : devConfig;
};
