const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const fonts = require('./webpack/fonts');
const js = require('./webpack/js');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const sprite = require('./webpack/sprite');

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

const common = merge([
	{
		entry: {
			'index': PATHS.source + '/pages/index/index.js',
			'feedbacks': PATHS.source + '/pages/feedbacks/feedbacks.js',
			'partner-program': PATHS.source + '/pages/partner-program/partner-program.js',
			'personal-area': PATHS.source + '/pages/personal-area/personal-area.js',
			'personal-area-static': PATHS.source + '/pages/personal-area-static/personal-area-static.js',
			'personal-area-balance': PATHS.source + '/pages/personal-area-balance/personal-area-balance.js',
			'personal-area-payments': PATHS.source + '/pages/personal-area-payments/personal-area-payments.js',
			'personal': PATHS.source + '/pages/personal/personal.js',
			'akkaunty-mail': PATHS.source + '/pages/akkaunty-mail/akkaunty-mail.js',
			'buyakkaynt': PATHS.source + '/pages/buyakkaynt/buyakkaynt.js',
			'personal-area-promotional-materials': PATHS.source + '/pages/personal-area-promotional-materials/personal-area-promotional-materials.js',
		},
		output: {
			path: PATHS.build,
			filename: 'js/[name].js'
		},
		externals: {
			'jquery-mousewheel': 'jquery-mousewheel',
			'../TweenLite': 'TweenLite',
		},
		resolve: {
			modules: ["node_modules", "source"],
			alias: {
				'sprite': path.resolve(__dirname, 'source/spritesmith/'),
				'img': path.resolve(__dirname, 'source/img/'),
				'fonts': path.resolve(__dirname, 'source/fonts/'),
				'sass': path.resolve(__dirname, 'source/sass/')
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				chunks: ['index', 'common'],
				template: PATHS.source + '/pages/index/index.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'partner-program.html',
				chunks: ['partner-program', 'common'],
				template: PATHS.source + '/pages/partner-program/partner-program.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'feedbacks.html',
				chunks: ['feedbacks', 'common'],
				template: PATHS.source + '/pages/feedbacks/feedbacks.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'personal-area.html',
				chunks: ['personal-area', 'common'],
				template: PATHS.source + '/pages/personal-area/personal-area.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'personal-area-static.html',
				chunks: ['personal-area-static', 'common'],
				template: PATHS.source + '/pages/personal-area-static/personal-area-static.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'personal-area-balance.html',
				chunks: ['personal-area-balance', 'common'],
				template: PATHS.source + '/pages/personal-area-balance/personal-area-balance.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'personal-area-payments.html',
				chunks: ['personal-area-payments', 'common'],
				template: PATHS.source + '/pages/personal-area-payments/personal-area-payments.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'personal.html',
				chunks: ['personal', 'common'],
				template: PATHS.source + '/pages/personal/personal.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'akkaunty-mail.html',
				chunks: ['akkaunty-mail', 'common'],
				template: PATHS.source + '/pages/akkaunty-mail/akkaunty-mail.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'buyakkaynt.html',
				chunks: ['buyakkaynt', 'common'],
				template: PATHS.source + '/pages/buyakkaynt/buyakkaynt.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'personal-area-promotional-materials.html',
				chunks: ['personal-area-promotional-materials', 'common'],
				template: PATHS.source + '/pages/personal-area-promotional-materials/personal-area-promotional-materials.pug'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				name: 'common'
			}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		]
	},
	pug(),
	sprite(),
	images(),
	fonts()
]);

module.exports = function(env) {
	if (env === 'production'){
		return merge([
			common,
			extractCSS(),
			uglifyJS(),
			js()
		]);
	}
	if (env === 'development'){
		return merge([
			common,
			js(),
			css(),
			sass(),
			devserver()
		]);
	}
};










