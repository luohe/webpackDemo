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

var noParse = [
	// 'react-dom',
	// 'react-redux'
];
var config = {
	debug: true,
	devtool: 'eval-source-map',
	target: 'web',
	cache: true,
	entry: {
		lib: ROOT_CONFIG.DEV_JS_MODULE
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: ROOT_CONFIG.DIST_PATH,
		libraryTarget: 'umd',
		publicPath: '/'
	},
	resolve: {
		alias: []
	},
	externals:{},
	module: {
		loaders: [
			{
				test: /[\.jsx|\.js]$/,
				loader: "eslint-loader",
				exclude: /node_modules/
			},
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
				test: /\.scss$/,
				include: path.resolve(__dirname, '../assets/src/manage/js'),
				loaders: [
					'style',
					'css?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
					'postcss?parser=postcss-scss'
				]
			},
			// 组件样式，需要私有化，单独配置
			{
				test: /\.scss$/,
				include:path.resolve(__dirname, '../assets/src/manage/css'),
				loader: 'style!css!postcss?parser=postcss-scss'
			},
			// 公有样式，不需要私有化，单独配置
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?!less-loader")
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.(otf|eot|svg|ttf|woff|woff2).*$/,
				loader: 'url?limit=10000'
			},
			{
				test: /\.(gif|jpe?g|png|ico)$/,
				loader: 'url?limit=10000'
			}
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
		new CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		})
	],
	postcss:function () {
		return [precss,autoprefixer,rucksackCss,px2rem(px2remOpts)]
	}
};

module.exports = config;
