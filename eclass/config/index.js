const path = require('path')
// NOTE 在 sass 中通过别名（@ 或 ~）引用需要指定路径
const sassImporter = function (url) {
  if (url[0] === '~' && url[1] !== '/') {
    return {
      file: path.resolve(__dirname, '..', 'node_modules', url.substr(1))
    }
  }

  const reg = /^@\/assets\/(.*)/
  return {
    file: reg.test(url) ? path.resolve(__dirname, '..', 'src/assets', url.match(reg)[1]) : url
  }
}

const config = {
  projectName: 'eClass',
  date: '2019-11-20',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  babel: {
    sourceMap: true,
    presets: [
      ['env', {
        modules: false
      }]
    ],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": 'babel-runtime'
      }]
    ]
  },
  sass: {
    importer: sassImporter
  },
  plugins: {
  },
  defineConstants: {
  },
  alias: {
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/basicComponents': path.resolve(__dirname, '..', 'src/basicComponents'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/config': path.resolve(__dirname, '..', 'src/config'),
    '@/platfrom': path.resolve(__dirname, '..', 'src/platfrom'),
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      name: 'vendors',
      cacheGroups: {
        vendors: {
          test (module) {
            return /[\\/]@\/components[\\/]/.test('src/components')
          }
        }
      }
    }
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  mini:{
    webpackChain (chain, webpack) {

    },
    postcss:{
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 10240 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    devServer: {
      host: 'localhost',
      port: 8088,
      proxy: {
        '/proxy/': {
          target: 'http://eclass.douqutj.com',
          changeOrigin: true,
          pathRewrite: { '^/proxy': '' },
        },
      },
    },
    // publicPath: process.env.NODE_ENV === 'development' ? '/' : './',//这个以弃用不要开启
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    module: {
    },
    router: {
      mode: 'browser' // 或者是 'hash'
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
