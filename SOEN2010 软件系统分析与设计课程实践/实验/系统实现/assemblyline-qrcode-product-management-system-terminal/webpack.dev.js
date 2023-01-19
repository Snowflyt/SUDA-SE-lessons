const { HotModuleReplacementPlugin } = require('webpack')
const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    hot: true
  },
  plugins: [new HotModuleReplacementPlugin()]
}

module.exports = merge(commonConfig, devConfig)
