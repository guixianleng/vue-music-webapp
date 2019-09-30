const SkeletonPlugin = require('page-skeleton-webpack-plugin').SkeletonPlugin
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')

const path = require('path')
const IS_PROD = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  configureWebpack: config => {
    let plugins = []
    // 自动生成骨架屏
    plugins.push(new SkeletonPlugin({
      pathname: resolve('./shell'), // pathname为来存储 shell 文件的地址
      staticDir: resolve('./dist'), // 最好和 `output.path` 相同
      routes: ['/', '/about'], // 将需要生成骨架屏的路由添加到数组中
      port: '7890'
    }))
    config.plugins = [
      ...config.plugins,
      ...plugins
    ]
    return {
      devtool: 'source-map',
      resolve: {
        // 配置项目别名
        alias: {
          '@': resolve('./src'),
          'api': resolve('./src/api'),
          'assets': resolve('./src/assets'),
          'baseUI': resolve('./src/baseUI'),
          'components': resolve('./src/components'),
          'utils': resolve('./src/utils'),
          'views': resolve('./src/views')
        }
      }
    }
  },
  chainWebpack: config => {
    if (IS_PROD) {
      config.plugin('html').tap(opts => {
        console.log(opts[0])
        opts[0].minify.removeComments = false
        return opts
      })
    }
  },
  devServer: {
    open: true,
    hot: true,
    port: 9530,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:30003',
        changeOrigin: true,
        pathRewrite: { '^/api': 'api' }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 16,
            propList: ['*']
          })
        ]
      }
    }
  }
}
