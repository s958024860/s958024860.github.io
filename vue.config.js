const webpack = require('webpack')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const tee3 = [
  'js/tee3/cn.tee3.avd-3.6.0.0.min.js',
  'js/tee3/init.js',
  'js/jquery.min.js'
]

const assets = [ ...tee3 ]

module.exports = {
  runtimeCompiler: true, // You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  lintOnSave: true,
  publicPath: './',
  devServer: {
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/' : {
        changeOrigin: true,
        target: 'http://localhost:8000/',
      }
    }
  },

  // // transpileDependencies: ['填入需要后编译的模块名'],
  //
  chainWebpack: config => {
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('markdown-loader')
      .loader('markdown-loader')
      .loader('html-loader')

    // config.module.rules.delete('svg')
    // config.module
    //   .rule('svg-sprite-loader')
    //   .test(/.svg$/)
    //   .include
    //   .add(path.resolve(__dirname, './src/icons'))
    //   .end()
    //   .use('svg-sprite-loader')
    //   .loader('svg-sprite-loader')
    //   .options({
    //     symbolId: '[name]'
    //   })
    //   .end()
    //
    // const imagesRule = config.module.rule('images')
    // imagesRule.exclude.add(path.resolve(__dirname, './src/icons'))
    // config.module
    //   .rule('images')
    //   .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)

  },
  // todo
  configureWebpack: config => {
    return {
      // plugin: [
      //   new webpack.ProvidePlugin({
      //     Log: 'lmw-console-log'
      //   }),
      //   new HtmlWebpackIncludeAssetsPlugin({
      //     assets: assets,
      //     append: false
      //   })
      // ]
    }
  },
}
