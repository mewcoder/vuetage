const {
  IgnorePlugin,
  DefinePlugin,
  ProgressPlugin,
  ProvidePlugin
} = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { EsbuildPlugin } = require('esbuild-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WriteHashPlugin = require('./lib/write-hash-plugin');
const WebpackBar = require('webpackbar');
const LogServerAddress = require('./lib/log-server-address');

module.exports = {
  IgnorePlugin,
  DefinePlugin,
  ProgressPlugin,
  ProvidePlugin,
  CopyPlugin,
  MiniCssExtractPlugin,
  CompressionPlugin,
  HtmlWebpackPlugin,
  VueLoaderPlugin,
  EsbuildPlugin,
  ESLintPlugin,
  FriendlyErrorsWebpackPlugin,
  BundleAnalyzerPlugin,
  CaseSensitivePathsPlugin,
  WebpackBar,
  LogServerAddress,
  WriteHashPlugin
};
