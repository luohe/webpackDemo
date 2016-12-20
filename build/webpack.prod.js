"use strict";
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var _    = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var ROOT_CONFIG = require('./root.config');

// 辅助函数
const utils = require('./utils');

//根据传入的正则寻找相对应的路径对象
const pickFiles = utils.pickFiles;


//公共模块路径映射:降低 require 路径查找的时间
var alias;
alias = pickFiles({
	id: /(conf\/[^\/]+).js$/,
	pattern: ROOT_CONFIG.SRC_PATH + '/conf/*.js'
});

alias = Object.assign(alias, pickFiles({
	id: /(components\/[^\/]+)/,
	pattern: ROOT_CONFIG.SRC_PATH + '/components/*/index.js'
}));

// reducers
// import reducers from 'reducers/index';

alias = Object.assign(alias, pickFiles({
	id: /(reducers\/[^\/]+).js/,
	pattern: ROOT_CONFIG.SRC_PATH + '/redux/reducers/*'
}));



// actions
// import actions from 'actions/index';

alias = Object.assign(alias, pickFiles({
	id: /(actions\/[^\/]+).js/,
	pattern: ROOT_CONFIG.SRC_PATH + '/redux/actions/*'
}));

alias = Object.assign(alias, {
	'react-router': ROOT_CONFIG.NODE_MODULES_PATH + '/react-router/lib/index.js',
	'react-redux': ROOT_CONFIG.NODE_MODULES_PATH + '/react-redux/lib/index.js',
	'redux': ROOT_CONFIG.NODE_MODULES_PATH + '/redux/lib/index.js',
	'redux-thunk': ROOT_CONFIG.NODE_MODULES_PATH + '/redux-thunk/lib/index.js'
});

var config = {
	context: ROOT_CONFIG.SRC_PATH,
	entry: ROOT_CONFIG.PRODUCTION_JS_MODULE,
	output: {
		path: ROOT_CONFIG.DIST_PATH+"/",
		libraryTarget: 'umd',
		filename:  'js/[name].[chunkhash].js',
		chunkFilename:  'js/[name].[chunkhash].js',
		publicPath:ROOT_CONFIG.PUBLIC_PATH,
	},
	module: {},
	resolve: {
		root: ROOT_CONFIG.SRC_PATH,
		alias: alias
	},
	plugins: [
		new CleanWebpackPlugin(['dist','cache'],{
			root: ROOT_CONFIG.ROOT_PATH+"\\assets",
			verbose: true,
			dry: false
			// exclude: ['shared.js']
		}),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: ROOT_CONFIG.CHUNK_MODULE,
			minChunks: Infinity
		}),
		// 使用文件名替换数字作为模块ID
		new webpack.NamedModulesPlugin(),
		// 根据文件内容生成 hash
		new WebpackMd5Hash()
	]
};

// 将entry合并到webpack中
_.merge(config.entry, ROOT_CONFIG.PRODUCTION_ENTRY_PATH);

// loaders
config.module.loaders = [];

config.module.loaders.push({
	test: /[\.jsx|\.js]$/,
	// exclude: /node_modules/,
	// loader: 'babel',
	presets: [
		'react',
		'es2015'
	],
	// plugins:[
	// 	'transform-object-assign'
	// ],
	// query: {
	// 	cacheDirectory: true
	// },
	// test: /\.js$/,
	exclude: /node_modules/,
	loaders: ['babel?cacheDirectory=' + ROOT_CONFIG.CACHE_PATH]
});

//less css 处理————————————————————————————————————————————————————————————————————————————
	config.module.loaders.push({
		publicPath:"./css/images",
		test: /\.(less|css)$/,
		loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
	});

	config.plugins.push(
		new ExtractTextPlugin('css/[name].[contenthash].css')
	);

config.postcss = function() {
	return [precss, autoprefixer];
};
//less css 处理————————————————————————————————————————————————————————————————————————————
//image 处理——————————————————————————————————————————————————————————————————————————————
config.module.loaders.push({
	test: /\.(png|jpg|gif)$/,
	loader: 'url-loader?limit=8192&name=/images/[name]-[hash].[ext]',
});


config.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {
			comments: false
		}
	})
);
//image 处理——————————————————————————————————————————————————————————————————————————————
//排除重复模块——————————————————————————————————————————————————
config.plugins.push(
	new webpack.optimize.DedupePlugin()
);
//排除重复模块——————————————————————————————————————————————————
//内嵌html

for (var i=0;i<ROOT_CONFIG.HTML_JS_RELY.length;i++){
	var H =
		new HtmlWebpackPlugin({
			filename:ROOT_CONFIG.HTML_JS_RELY[i].filename+'.html',
			chunks:ROOT_CONFIG.HTML_JS_RELY[i].chunks,
			template: ROOT_CONFIG.SRC_PATH + '/'+ROOT_CONFIG.HTML_JS_RELY[i].filename+'/'+ROOT_CONFIG.HTML_JS_RELY[i].filename+'.html',
			minify: {
				collapseWhitespace: true,
				collapseInlineTagWhitespace: true,
				removeRedundantAttributes: true,
				removeEmptyAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				removeComments: true
			}
		});
	config.plugins.push(H)
}


// // 内嵌 manifest 到 html 页面
// config.plugins.push(function() {
// 	this.plugin('compilation', function(compilation) {
// 		compilation.plugin('html-webpack-plugin-after-emit', function(file, callback) {
// 			var manifest = '';
// 			Object.keys(compilation.assets).forEach(function(filename) {
// 				if (/\/?manifest.[^\/]*js$/.test(filename)) {
// 					manifest = '<script>' + compilation.assets[filename].source() + '</script>';
// 				}
// 			});
// 			if (manifest) {
// 				var htmlSource = file.html.source();
// 				htmlSource = htmlSource.replace(/(<\/head>)/, manifest + '$1');
// 				file.html.source = function() {
// 					return htmlSource;
// 				};
// 			}
// 			callback(null, file);
// 		});
// 	});
// });
module.exports = config;





