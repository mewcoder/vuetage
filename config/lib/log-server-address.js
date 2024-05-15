const { cyan, green, yellow } = require('colorette');
const paths = require('../paths');
const WebpackDevServer = require('webpack-dev-server');

class LogServerAddress {
  constructor(getPort) {
    this.getPort = getPort;
  }

  apply(compiler) {
    compiler.hooks.done.tap('LogServerAddress', async stats => {
      const port = this.getPort();
      const publicPath = paths.getPublicPath();
      const localIPv4 = await WebpackDevServer.internalIP('v4');
      console.log();
      console.log(`  App running at:`);
      console.log(
        `- Local:   ${cyan(`http://localhost:${port}${publicPath}`)}`
      );
      console.log(
        `- Network: ${cyan(`http://${localIPv4}:${port}${publicPath}`)}`
      );
      const time = (stats.endTime - stats.startTime) / 1000;
      console.log(`- Time:    ${green(time + 's')}`);
      console.log(`- Proxy:   ${yellow('./proxy.config.json')}`);
      console.log();
    });
  }
}

module.exports = LogServerAddress;
