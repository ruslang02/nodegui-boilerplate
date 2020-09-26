const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require("webpack");
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const globImporter = require('node-sass-glob-importer');

module.exports = (_env, argv) => {
  const isDev = argv.mode !== 'production';
  return {
    mode: isDev ? "development" : "production",
    entry: {
      "index.js": "./src",
      'light.theme': './src/themes/light.theme.scss',
      'dark.theme': './src/themes/dark.theme.scss',
      // 'cyan.theme': './src/themes/cyan.theme.scss',
    },
    optimization: {
      minimize: !isDev,
      minimizer: [new TerserPlugin({
        terserOptions: {
          keep_classnames: true
        }
      })],
    },
    target: "node",
    node: {
      __dirname: false,
      __filename: false,
      fs: "empty",
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name]",
    },
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: { publicPath: "dist" },
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
              loader: "native-addon-loader",
              options: { name: "[name]-[hash].[ext]" },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
      mainFields: ["main"],
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
