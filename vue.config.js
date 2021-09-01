const path = require('path')
// const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启gzip压缩， 按需引用
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i // 开启gzip压缩， 按需写入
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV) // 生产环境检测
const Timestamp = new Date().getTime()

// MARK: 优化webpack配置（多核构建，服务器压缩）

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  // 基本路径
  publicPath: './',
  // 生产环境构建文件的目录
  outputDir: 'dist',
  // 相对于 outputDir 的静态资源目录
  assetsDir: 'static',
  //eslint规范
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件 -- 资源地图
  productionSourceMap: !IS_PROD,
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  // 打包的时候不使用hash值.因为我们有时间戳来确定项目的唯一性了.
  // filenameHashing: false,

  // webpack-dev-server 相关配置
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: false,
      errors: true
    },
    // 自动打开浏览器
    open: false,
    // 设置为0.0.0.0则所有的地址均能访问
    host: '0.0.0.0',
    // 保存代码的时候是否自动刷新页面
    inline: true,
    // 单纯设置为true的时候，如果编译报错，会抛出错误，你重新改成正确的，这个时候又会触发重新编译，整个浏览器会重新刷新！
    hot: true,
    // 这个也设置的话，如果编译报错，你再改成正确的，重新编译，浏览器不会刷新！
    // hotOnly: true,
    // 端口
    port: 8080,
    // dev服务器是否开启https
    https: false,
    // DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。 它通常用于搭配 --host 0.0.0.0 使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查
    disableHostCheck: true,
    // gzip 对所有请求启用gzip压缩
    compress: false

    // 使用代理
    /*proxy: { //配置多个跨域
      "/api": {
        target: "http://172.11.11.11:7071",
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api": "/"
        }
      },
      "/api2": {
        target: "http://172.12.12.12:2018",
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          "^/api2": "/"
        }
      },
    }*/
  },

  // webpack配置 链式方程写法
  chainWebpack: config => {
    // 修复热更新失效
    config.resolve.symlinks(true)

    // 自动化导入scss的变量、mixin(这里不要放全局样式)
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))

    // 路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@utils', resolve('src/utils'))

    // 压缩图片 --- 需要 npm i -D image-webpack-loader
    /*config.module.rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        mozjpeg: {
          progressive: true,
          quality: 65
        },
        optipng: {
          enabled: false
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        webp: {
          quality: 75
        }
      });*/

    // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
    /*if (IS_PROD) {
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [{
        analyzerMode: "static"
      }]);
    }*/
  },

  // webpack配置 对象操作写法
  configureWebpack: config => {
    // 开启 gzip 压缩 需要 npm i -D compression-webpack-plugin
    /*const plugins = [];
    if (IS_PROD) {
      plugins.push(new CompressionWebpackPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8
      }));
    }
    config.plugins = [...config.plugins, ...plugins];*/

    if (IS_PROD) {
      // 为生产环境修改配置
      config.mode = 'production'
      // 移除打印
      /**
       config.optimization.minimizer = [
       new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
       ]
       */
    } else {
      // 为开发环境修改配置
      config.mode = 'development'
    }

    // js输出重构 // 费事浏览器缓存
    config.output.filename = `static/js/[name]&&${process.env.VUE_APP_VERSION}&&${Timestamp}.js`
    config.output.chunkFilename = `static/js/[name]&&${process.env.VUE_APP_VERSION}&&${Timestamp}.js`
  },

  // css输出设置
  css: {
    // 开启 CSS source maps; 感觉有点耗性能
    sourceMap: false,

    // css输出重构
    extract: IS_PROD
      ? {
          filename: `static/css/[name]&&${process.env.VUE_APP_VERSION}&&${Timestamp}.css`,
          chunkFilename: `static/css/[name]&&${process.env.VUE_APP_VERSION}&&${Timestamp}.css`
        }
      : false,

    // cssLoader
    loaderOptions: {},

    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|css|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    requireModuleExtension: false
  }
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/css/mixin.scss'),
        path.resolve(__dirname, './src/assets/css/variable.scss')
      ]
    })
}
