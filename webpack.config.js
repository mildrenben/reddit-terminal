const path = require('path')
const webpack = require('webpack')

const port = process.env.PORT || '8000'

const config = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, './renderer.js'),
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`
  ],
  target: 'electron-renderer',
  output: {
    filename: 'renderer.bundle.js',
    path: __dirname + '/bundle',
    publicPath: `http://localhost:${port}/bundle/`,
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      { test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'renderer.js')
        ],
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react', 'react-hmre']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js']
  }
}

module.exports = config