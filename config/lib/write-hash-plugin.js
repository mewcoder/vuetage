const { RawSource } = require('webpack-sources');
const { Compilation } = require('webpack');
const { updateJsonFile, resolveApp } = require('../utils');

class WriteHashPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('WriteHashPlugin', compilation => {
      compilation.hooks.processAssets.tap(
        {
          name: 'WriteHashPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE
        },
        () => {
          let cssFileName = '';

          // 遍历 assets，找到 CSS 文件
          for (const { name } of compilation.getAssets()) {
            if (name.endsWith('.css')) {
              cssFileName = name;
              break;
            }
          }

          if (!cssFileName) {
            console.warn('No CSS file found');
            return;
          }

          // 从文件名中提取 content hash，这里假设你的文件名格式是 '[name].[contenthash].css'
          const match = cssFileName.match(/\.([a-f0-9]+)\.css$/);

          if (!match) {
            console.warn('Unable to extract content hash from file name');
            return;
          }

          const cssHash = match[1];

          // 使用工具函数更新 JSON 文件
          updateJsonFile(resolveApp('static-hash.json'), 'skinHash', cssHash);
          console.log('update hash to static-hash.json:', cssHash);

          // 重命名文件，去掉 content hash
          const newFileName = cssFileName.replace(`.${cssHash}`, '');
          const { source } = compilation.getAsset(cssFileName);

          compilation.emitAsset(newFileName, new RawSource(source.source()));
          compilation.deleteAsset(cssFileName);
        }
      );
    });
  }
}

module.exports = WriteHashPlugin;
