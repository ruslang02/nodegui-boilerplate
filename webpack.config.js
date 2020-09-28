const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

module.exports = (_env, argv) => {
  const isDev = argv.mode !== 'production';
  const themes = Object.fromEntries(fs.readdirSync('./src/themes').map(value => [
    value.replace('.scss', ''),
    './src/themes/' + value
  ]));
  return {
    mode: isDev ? 'development' : 'production',
    entry: {
      'index.js': './src',
      ...themes
    },
    optimization: {
      minimize: !isDev,
      minimizer: [new TerserPlugin({
        terserOptions: {
          keep_classnames: true
        }
      })],
    },
    target: 'node',
    node: {
      __dirname: false,
      __filename: false,
      fs: 'empty',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]',
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            'thread-loader',
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                happyPackMode: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: { publicPath: 'dist' },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  importer: globImporter(),
                }
              }
            },
          ],
        },
        {
          test: /\.node$/,
          use: [
            {
              loader: 'native-addon-loader',
              options: { name: '[name].[ext]' },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      mainFields: ['main'],
      alias: {
        'fetch': path.join(__dirname, '../node_modules', 'whatwg-fetch', 'fetch.js'),
      }
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ProvidePlugin({
        'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      }),
      new MiniCssExtractPlugin({
        filename: 'themes/[name].css',
      }),
      new CopyPlugin({
        patterns: [
          { from: 'assets', to: 'assets' },
          { from: 'locales', to: 'locales' }
        ]
      })
    ],
    stats: {
      warnings: false,
      children: false
    },
  }
};
