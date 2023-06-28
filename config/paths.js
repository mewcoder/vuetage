const fs = require('fs');
const path = require('path');

// Make sure any symlinks in the project folder are resolved: https://github.com/facebook/create-react-app/issues/637
// 根路径
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const outputPath = process.env.OUTPUT_PATH || 'dist';

const publicPath = process.env.PUBLIC_URL || '/';

const moduleFileExtensions = ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.vue', '.json'];

module.exports = {
  appPath: resolveApp('.'),
  appEntry: resolveApp('src/main.ts'),
  appOutput: resolveApp(outputPath), // 输出路径
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  appHtml: resolveApp('public/index.html'),
  publicPath,
  moduleFileExtensions
};
