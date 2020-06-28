// const path = require('path')
// const webpackConfig = require('./webpack-config/config.js')

module.exports = {
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
  // chainWebpack: (config) => {
  //   config.module.rules.delete('svg')
  //   config.module
  //     .rule('svg-sprite-loader')
  //     .test(/.svg$/)
  //     .include
  //     .add(path.resolve(__dirname, './src/icons'))
  //     .end()
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: '[name]'
  //     })
  //     .end()
  //
  //   const imagesRule = config.module.rule('images')
  //   imagesRule.exclude.add(path.resolve(__dirname, './src/icons'))
  //   config.module
  //     .rule('images')
  //     .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
  //
  // },
  //
  // configureWebpack: (config) => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
  //   }
  //   return webpackConfig;
  // },
  //
  // css: {
  //   loaderOptions: {
  //     less: {
  //       javascriptEnabled: true,
  //       modifyVars: {
  //         // red: '#03a9f4',
  //         // blue: '#3eaf7c',
  //         // orange: '#f08d49',
  //         // 'text-color': '#111'
  //       }
  //     }
  //   }
  // }

};
