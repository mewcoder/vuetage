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
  return getPath(paths.getAssetsPath(), `${type}/[name].[hash:8][ext]`);
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

module.exports = {
  resolveApp,
  genAssetPath,
  ensureEndSlash,
  removeEndSlash,
  removeSlash
};
