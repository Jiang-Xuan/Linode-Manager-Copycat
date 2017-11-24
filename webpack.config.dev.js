const path = require('path')
const process = require('process')
const webpack = require('webpack')

const _package = require('./package.json')

module.exports = {
  context: __dirname,
  node: {
    __filename: true,
  },
  devtool: 'source-map',
  entry: [
    'eventsource-polyfill', // necessary fot hot reloading with ie
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      ENV_DEVTOOLS_DISABLED: JSON.stringify(process.env.ENV_DEVTOOLS_DISABLED),
      ENV_API_ROOT: JSON.stringify(process.env.ENV_API_ROOT),
      ENV_LOGIN_ROOT: JSON.stringify(process.env.ENV_LOGIN_ROOT),
      ENV_APP_ROOT: JSON.stringify(process.env.ENV_APP_ROOT),
      ENV_GA_ID: JSON.stringify(process.env.ENV_GA_ID),
      ENV_SENTRY_URL: JSON.stringify(process.env.ENV_SENTRY_URL),
      ENV_VERSION: JSON.stringify(_package.version),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
      {
        test: /\.jsx?/,
        use: ['babel-loader'],
        include: [
          path.join(__dirname, 'src'),
          path.resolve(__dirname, './node_modules/linode-components'),
          path.resolve(__dirname, './components'),
          path.resolve(__dirname, './node_modules/linode-styleguide'),
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, './node_modules/bootstrap/scss/'),
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['file-loader'],
        include: path.join(__dirname, 'node_modules'),
      },
    ],
  },
  resolve: {
    alias: {
      react: path.join(__dirname, 'node_modules', 'react'),
    },
  },
}
