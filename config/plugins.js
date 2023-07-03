const { DefinePlugin, ProgressPlugin, ProvidePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { EsbuildPlugin } = require('esbuild-loader');
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
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
  BundleAnalyzerPlugin
};
