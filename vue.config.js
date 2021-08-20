const path = require('path')
// const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
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
  productionSourceMap: false,

  // webpack-dev-server 相关配置
  devServer: {
    // 自动打开浏览器
    open: false,
    // 设置为0.0.0.0则所有的地址均能访问
    host: '0.0.0.0',
    // 保存代码的时候是否自动刷新页面
    inline: true,
    // 热更新
    hot: true,
    // 热模块替换
    // hotOnly: false,
    // 端口
    port: 8080,
    // dev服务器是否开启https
    https: false,
    // DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。 它通常用于搭配 --host 0.0.0.0 使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查
    disableHostCheck: true,
    // gzip 服务器压缩
    compress: false

    // 使用代理
    // proxy: { //配置多个跨域
    //   "/api": {
    //     target: "http://172.11.11.11:7071",
    //     changeOrigin: true,
    //     // ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       "^/api": "/"
    //     }
    //   },
    //   "/api2": {
    //     target: "http://172.12.12.12:2018",
    //     changeOrigin: true,
    //     //ws: true,//websocket支持
    //     secure: false,
    //     pathRewrite: {
    //       "^/api2": "/"
    //     }
    //   },
    // }
  },

  // webpack配置 链式方程写法
  chainWebpack: config => {
    // 路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@utils', resolve('src/utils'))
      .set('@components', resolve('src/components'))
  },

  // webpack配置 对象操作写法
  configureWebpack: config => {
    if (IS_PROD) {
      // 为生产环境修改配置
      config.mode = 'production'
      /**
       // 移除打印
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

    // js输出重构
    config.output.filename = `static/js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`
    config.output.chunkFilename = `static/js/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.js`
  },

  // css输出设置
  css: {
    // 从 v4 起已弃用，请使用css.requireModuleExtension。 在 v3 中，这个选项含义与 css.requireModuleExtension 相反。
    // modules: true,
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|css|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    requireModuleExtension: false,

    // cssLoader
    loaderOptions: {},
    // 开启 CSS source maps
    sourceMap: false,
    // css输出重构
    extract: {
      filename: `static/css/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.css`,
      chunkFilename: `static/css/[name].${process.env.VUE_APP_VERSION}.${Timestamp}.css`
    }
  }
}
