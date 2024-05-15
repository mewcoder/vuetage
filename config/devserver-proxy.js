const { getProxyRouterConfig } = require('./utils.js');

module.exports = {
  '/api': {
    target: 'http://api.github.com', // 已无效，通过router配置为准
    changeOrigin: true,
    secure: false,
    router: getRouter,
    onProxyReq: getReq
    // pathRewrite: {
    //   '/api': ''
    // }
  }
};

const routerConfig = {
  current: '',
  cookie: '',
  token: ''
};

/**
 * @desc 加headers
 */
function getReq(proxyReq) {
  // const { cookie, token } = routerConfig;
  // proxyReq.setHeader('X-CSRF-TOKEN', token);
  // proxyReq.setHeader('Cookie', cookie);
}

/**
 * @desc 实现动态切换proxy target 无需重启devServer
 */
function getRouter() {
  const { target, routes, cookie, token } = getProxyRouterConfig();
  const current = routes[target] || target;
  if (routerConfig.current !== current) {
    console.log(`proxy target: ${target}(${current})`);
  }
  routerConfig.current = current;
  routerConfig.cookie = cookie;
  routerConfig.token = token;
  console.log(routerConfig);
  return current;
}
