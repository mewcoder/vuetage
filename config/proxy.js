const { readFileSync } = require('fs');
const { resolve } = require('path');

/**
 * @desc 配置文件说明
 * @param {*} target 要使用的目标地址，可以是routers中的key或地址
 * @param {*} routers 常用的后端服务地址
 * @param {*} token 直连平台使用的 X-CSRF-TOKEN
 * @param {*} cookie 直连平台使用的 Cookie
 */
const configPath = '../proxyrc';

const cache = {
  current: '',
  cookie: '',
  token: ''
};

/**
 * @desc 读取配置
 */
function getConfig() {
  try {
    const jsonStr = readFileSync(resolve(__dirname, configPath), 'utf-8');
    const confg = JSON.parse(jsonStr);
    return confg;
  } catch {
    console.log('get proxy.config.json failed');
  }
}

/**
 * @desc 动态切换proxy target 无需重启devServer
 */
function getRouter() {
  const { target, routes, cookie, token } = getConfig();
  const current = routes[target] || target;
  if (cache.current !== current) {
    console.log(`switch-proxy-target: ${target}(${current})`);
  }
  cache.current = current;
  cache.cookie = cookie;
  cache.token = token;
  return current;
}

/**
 * @desc 加headers
 */
function getReq(proxyReq) {
  const { cookie, token } = cache;
  proxyReq.setHeader('X-CSRF-TOKEN', token);
  proxyReq.setHeader('Cookie', cookie);
}

module.exports = {
  getRouter,
  getReq
};
