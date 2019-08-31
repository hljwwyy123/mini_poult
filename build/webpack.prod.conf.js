var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var appJson = require('../src/app.json');

var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('[name].js'),
    chunkFilename: utils.assetsPath('[id].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('[name].wxss')
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })

  ]
})


var vendors = [],
  entry = [],
  common_vendor = 'common/vendor';

//加入入口文件
appJson.pages.unshift("app");

//提取主包公共文件
webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  name: common_vendor,
  chunks: appJson.pages,
  minChunks: function (module, count) {
    return (
      module.resource &&
      /\.js$/.test(module.resource) &&
      module.resource.indexOf('node_modules') >= 0
    ) || count > 1
  }
}));

//入口组文件加入主目录所有文件
entry = entry.concat(appJson.pages);

//将主包公共文件加入数组
vendors.push(common_vendor);

//判断是否存在分包
if (appJson.subPackages && appJson.subPackages.length > 0) {
  //将每个分包提取出公共文件
  appJson.subPackages.forEach(subPacksKey => {
    var sub_vendor = subPacksKey.root + '/common/vendor'

    var subPacks = subPacksKey.pages.map(key => {
      return path.join(subPacksKey.root, key);
    });

    //加入分包根目录下的main.js
    subPacks.unshift(path.join(subPacksKey.root, "pages", "main"));

    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: sub_vendor,
      chunks: subPacks,
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf('node_modules') >= 0
        ) || count > 1
      }
    }));

    //入口组文件加入每个分包所有文件
    entry = entry.concat(subPacks);

    //将每个分包公共文件加入数组
    vendors.push(sub_vendor);
  })

  //提取主包和分包公共文件的公共文件
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'common/common',
    chunks: vendors,
    minChunks: function (module, count) {
      // any required modules inside node_modules are extracted to vendor
      return count > 1
    }
  }))

  //打印所有入口文件
  console.log(entry);

  //提取 提取完分包 的主包和分包入口文件的公共文件
  // webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
  //   name: 'common/entry_common',
  //   chunks: entry,
  //   minChunks: function (module, count) {
  //     // any required modules inside node_modules are extracted to vendor
  //     return count > 1
  //   }
  // }))
}

webpackConfig.plugins.push(new webpack.HashedModuleIdsPlugin())
webpackConfig.plugins.push(new webpack.ContextReplacementPlugin(
    /moment[\/\\]locale$/,
    /zh-cn/
  ));

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}


module.exports = webpackConfig
