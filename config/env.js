const paths = require('./paths');

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  `${paths.dotenv}`
].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile
      })
    );
  }
});

// 环境变量以 VUE_APP_ 开头
const prefixRE = /^VUE_APP_/i;

function getClientEnv(publicUrl, raw) {
  const env = {};
  Object.keys(process.env).forEach(key => {
    if (prefixRE.test(key) || key === 'NODE_ENV') {
      env[key] = process.env[key];
    }
  });
  env.BASE_URL = publicUrl;
  if (raw) {
    return env;
  }

  for (const key in env) {
    env[key] = JSON.stringify(env[key]);
  }
  return {
    'process.env': env
  };
}

module.exports = getClientEnv;
