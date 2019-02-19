'use strict'

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const assetsRoot = './dist'

const NODE_ENV = process.env.NODE_ENV

module.exports = {
	mode: 'production',

	entry: {
		app: NODE_ENV === 'development' ? './examples/main.js' : './packages/table-pagination/index.js'
	},

	output: {
		path: path.resolve(__dirname, assetsRoot),
		// publicPath: './',
		filename: 'table-pagination.js',
		library: 'table-pagination',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.js$/,
				use: 'babel-loader'
			}
		]
	},

	// plugins: [
	// 	new VueLoaderPlugin(),
	// 	new CleanWebpackPlugin(assetsRoot),
	// 	new HtmlWebpackPlugin({
	// 		template: './examples/index.html'
	// 	})
	// ],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9527
	}
}

if (NODE_ENV === 'development') {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: './examples/index.html'
		})
	])
} else {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new VueLoaderPlugin(),
		new CleanWebpackPlugin(assetsRoot)
	])
}
