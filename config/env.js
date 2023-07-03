const fs = require('fs');
const paths = require('./paths');

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
function loadClientEnv(NODE_ENV) {
  process.env.NODE_ENV = NODE_ENV;

  const dotenvFiles = [
    `${paths.dotenv}.${NODE_ENV}.local`,
    `${paths.dotenv}.local`,
    `${paths.dotenv}.${NODE_ENV}`,
    `${paths.dotenv}`
  ];

  const { config } = require('dotenv');
  const { expand } = require('dotenv-expand');

  dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
      expand(
        config({
          path: dotenvFile
        })
      );
    }
  });
}

// 环境变量以 VUE_APP_ 开头
const prefixRE = /^VUE_APP_/i;

// 允许的其他环境变量
const envVars = ['NODE_ENV', 'BASE_URL'];

function getClientEnv(raw) {
  const env = {};
  Object.keys(process.env).forEach(key => {
    if (prefixRE.test(key) || envVars.includes(key)) {
      env[key] = process.env[key];
    }
  });

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

module.exports = {
  loadClientEnv,
  getClientEnv
};
