const fs = require('fs');
const path = require('path');

// Make sure any symlinks in the project folder are resolved: https://github.com/facebook/create-react-app/issues/637
// 项目根路径
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// 拼接路径 总是使用 / 作为分隔符
const getPath = (assetsDir, filePath) =>
  assetsDir ? path.posix.join(assetsDir, filePath) : filePath;

const genAssetPath = (type, hash) => {
  const paths = require('./paths');
  if (type === 'js' || type === 'css') {
    return getPath(
      paths.getAssetsPath(),
      `${type}/[name]${hash ? '.[contenthash:8]' : ''}.${type}`
    );
  }
  // images media fonts
  return getPath(
    paths.getAssetsPath(),
    `${type}/[name]${hash ? '.[hash:8]' : ''}[ext]`
  );
};

// 确保 path 以 / 结尾
const ensureEndSlash = path => {
  return path.replace(/([^/])$/, '$1/');
};

// 清除 path 结尾的 /
const removeEndSlash = path => {
  return path.replace(/\/$/g, '');
};

// 清除 path 前后的 /
const removeSlash = path => {
  return path.replace(/^\/*|\/*$/g, '');
};

/**
 * @desc 读取配置
 */
function getProxyRouterConfig() {
  /**
   * @desc .proxyrc 配置文件说明
   * @param {*} target 要使用的目标地址，可以是routes中的key或地址
   * @param {*} routes 常用的后端服务地址
   * @param {*} token
   * @param {*} cookie
   */
  const configPath = '../.proxyrc';

  try {
    const jsonStr = fs.readFileSync(
      path.resolve(__dirname, configPath),
      'utf-8'
    );
    const confg = JSON.parse(jsonStr);
    return confg;
  } catch {
    console.log('get .proxyrc failed');
  }
}

function updateJsonFile(filePath, key, newValue) {
  let jsonData = {};

  // 如果文件存在，读取文件内容
  if (fs.existsSync(filePath)) {
    const jsonContent = fs.readFileSync(filePath, 'utf8');
    jsonData = JSON.parse(jsonContent);
  }

  // 更新指定的 key
  jsonData[key] = newValue;

  // 将更新后的 JSON 数据写回文件
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
}

module.exports = {
  resolveApp,
  genAssetPath,
  ensureEndSlash,
  removeEndSlash,
  removeSlash,
  getProxyRouterConfig,
  updateJsonFile
};
