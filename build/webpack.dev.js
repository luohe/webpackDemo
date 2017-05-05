'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ROOT_CONFIG = require('./root.config');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var rucksackCss = require('rucksack-css');
var px2rem = require('postcss-pxtorem');

const px2remOpts = {
	rootValue: 100,
	propWhiteList: [],
};

//公共模块路径映射:降低 require 路径查找的时间
var alias;
alias = Object.assign({}, {
	'react-router': ROOT_CONFIG.NODE_MODULES_PATH + '/react-router/lib/index.js',
	'react-redux': ROOT_CONFIG.NODE_MODULES_PATH + '/react-redux/lib/index.js',
	'redux': ROOT_CONFIG.NODE_MODULES_PATH + '/redux/lib/index.js',
	'redux-thunk': ROOT_CONFIG.NODE_MODULES_PATH + '/redux-thunk/lib/index.js',
	"babel-polyfill":ROOT_CONFIG.NODE_MODULES_PATH + '/babel-polyfill/lib/index.js',
	"react-router-redux":ROOT_CONFIG.NODE_MODULES_PATH + '/react-router-redux/lib/index.js',
	"redbox-react":ROOT_CONFIG.NODE_MODULES_PATH + '/redbox-react/lib/index.js'
});
var noParse = [];
for (var k in alias){
	if (alias.hasOwnProperty(k)){
		noParse.push(alias[k]);
	}
}

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];


var config = {
	debug: true,
	devtool: 'eval-source-map',
	target: 'web',
	cache: true,
	entry: {
		// vendor: ROOT_CONFIG.DEV_JS_MODULE
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: ROOT_CONFIG.DIST_PATH,
		libraryTarget: 'umd',
		publicPath: '/'
	},
	resolve: {
		alias: alias
	},
	externals:{},
	module: {
		noParse:noParse,
		loaders: [
			{
				test: /[\.jsx|\.js]$/,
				exclude: /node_modules/,
				loader: 'babel',
				presets: [
					'react',
					'es2015'
				],
				plugins:[
					'transform-object-assign'
				],
				query: {
					cacheDirectory: true
				}
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?!less-loader")
			},
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            use: [{
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }],
            fallback: "style-loader"
          })
      },
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
      // 公有样式，不需要私有化，单独配置
      // {
      //   publicPath:"./css/images",
      //   test: /\.less$/,
      //   loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
      // },
      // {
      //   test: /\.css$/,
      //   loader: 'style!css!postcss'
      // },
			{
				test: /\.(otf|eot|ttf|woff|woff2).*$/,
				loader: 'url?limit=10000'
			},
			{
				test: /\.(gif|jpe?g|png|ico)$/,
				loader: 'url?limit=10000'
			},
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite',
        include: svgDirs,  // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      },
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			TARGET_HOST: JSON.stringify("http://www.ocopebc.com/")
		}),
		new ForceCaseSensitivityPlugin(),
		new ExtractTextPlugin("[name].css"),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		// new CommonsChunkPlugin({
		// 	name: 'vendor',
		// 	minChunks: Infinity
		// })
		new webpack.DllReferencePlugin({
			context: '.',
			manifest: require('./dll/vendor-manifest.json')
		})
	],
	postcss:function () {
		return [precss,autoprefixer,rucksackCss,px2rem(px2remOpts)];
	}
};

module.exports = config;
