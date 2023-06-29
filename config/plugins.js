const { DefinePlugin, ProgressPlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { EsbuildPlugin } = require('esbuild-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');

module.exports = {
  DefinePlugin,
  ProgressPlugin,
  CopyPlugin,
  MiniCssExtractPlugin,
  CompressionPlugin,
  HtmlWebpackPlugin,
  VueLoaderPlugin,
  EsbuildPlugin,
  ESLintPlugin,
  FriendlyErrorsWebpackPlugin
};
