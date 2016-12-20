'use strict';

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var ROOT_CONFIG = require('./root.config');

var noParse = [
	// 'react-dom',
	// 'react-redux'
];
var config = {
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
	resolve:{
		alias:{
			react:path.join(ROOT_CONFIG.NODE_MODULES_PATH,'./react/dist/react.min.js'),
			jquery:path.join(ROOT_CONFIG.NODE_MODULES_PATH,'./jquery/dist/jquery.min.js'),
			'react-dom':path.join(ROOT_CONFIG.NODE_MODULES_PATH,'./react-dom/dist/react-dom.min.js')
		},
		extensions: ['', '.js', '.json', '.coffee']
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
			}, {
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			}, {
				test: /\.less$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?!less-loader")
			}, {
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=8192'
			}, {
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
				loader: 'file'
			}, {
				test: /\.json$/,
				loader: 'json'
			}],
		/* 不通过webpack打包 */
		noParse: []
	},
	plugins: [
		new webpack.DefinePlugin({
			TARGET_HOST: JSON.stringify("http://www.ocopebc.com/")
		}),
		new ForceCaseSensitivityPlugin(),
		new ExtractTextPlugin("[name].css"),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		})
	],
	debug: true,
	devtool: 'eval-source-map'
};

module.exports = config;
