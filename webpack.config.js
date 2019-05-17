const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = function getWebpackConfig() {
  const isDev = (process.env.NODE_ENV === 'development');

  const preprocessLoader = `preprocess-loader?${isDev ? '+DEVELOPMENT' : ''}`;

  return {
    devServer: {
      compress: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      port: 3001,
      proxy: {
        '/v1': 'http://localhost:3000',
      },
      stats: 'errors-only',
      watchOptions: {
        ignored: [
          'node_modules',
        ],
      },
    },

    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',

    entry: {
      app: path.join(__dirname, 'src/client/index.js'),
    },

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
            },
          ],
        },
        {
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'svelte-loader',
              options: {
                emitCss: true,
              },
            },
            {
              loader: preprocessLoader,
            },
          ],
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            { loader: 'awesome-typescript-loader' },
            { loader: preprocessLoader },
          ],
        },
      ],
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            minChunks: 2,
            name: 'vendor',
            test: /node_modules/,
          },
        },
      },
    },

    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'public'),
      publicPath: '/',
    },

    plugins: getPlugins(isDev),

    resolve: {
      extensions: [ '.svelte', '.ts', '.mjs', '.js', '.json' ],
      mainFields: [ 'svelte', 'browser', 'module', 'main' ],
      modules: [
        path.join(__dirname, 'src/app'),
        'node_modules',
      ],
    },

    target: 'web',
  };
}

function getPlugins(isDev) {
  const devPlugins = [];

  if (isDev) {
    devPlugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return [
    ...devPlugins,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, 'src/client/index.html'),
    }),
    new MiniCssExtractPlugin({
      chunkFilename: '[id].css',
      filename: '[name].[hash].css',
    }),
  ];
}
