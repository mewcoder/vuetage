const { resolveApp, ensureEndSlash, removeSlash } = require('./utils');

const moduleFileExtensions = ['.js', '.mjs', '.ts', '.vue', '.json'];

module.exports = {
  appTitle: 'vuetage',
  appPath: resolveApp('.'),
  appEntry: resolveApp('src/main.ts'),
  appOutput: resolveApp('dist'), // 输出路径
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  appHtml: resolveApp('public/index.html'),
  dotenv: resolveApp('.env'),
  getPublicPath: () => ensureEndSlash(process.env.BASE_URL || '/'), // 从.env文件中读取后动态获取
  getAssetsPath: () => removeSlash(process.env.VUE_APP_ASSETS || ''),
  moduleFileExtensions
};
