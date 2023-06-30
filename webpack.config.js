const prodConfig = require('./config/webpack.prod.js');
const devConfig = require('./config/webpack.dev.js');
const { loadClientEnv } = require('./config/env.js');

module.exports = env => {
  loadClientEnv(env.production ? 'production' : 'development');
  return env.production ? prodConfig() : devConfig();
};
