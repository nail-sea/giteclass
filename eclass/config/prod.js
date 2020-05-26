
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      // imageUrlLoaderOption: {
      //   limit: 5000,
      //   name: 'static/images/[name].[hash:8].[ext]'
      // },
      miniCssExtractPluginOption: {
        filename: 'css/[name].[hash:8].css',
        chunkFilename: 'css/[name].[chunkhash:8].css',
      },
      　
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * */
    //  webpackChain (chain) {
    //     chain.plugin('analyzer')
    //       .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
    //  }
    
  },
  uglify: {
    enable: true,
    config: {
      compress:{
        warnings: false,
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'] // 移除console
      }
    }
  },
}
