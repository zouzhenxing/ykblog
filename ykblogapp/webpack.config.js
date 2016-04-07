var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry : ['./src/app.js'],
	output : {
//		path : 'D:/ykblog/public/app',
		path : __dirname + '/dist',
		filename : "build.js"
	},
	module : {
		loaders : [
			{
				test : /\.css$/,
				loader : ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!cssnext-loader")
			},
			{
				test : /\.vue$/,
				loader : "vue-loader"
			}
		]
	},
	plugins : [
		new ExtractTextPlugin("style.css", {
	        allChunks: true,
	        disable: false
	    }),
	    new webpack.ProvidePlugin({
	        $: 'webpack-zepto'
	    })
	],
	devtool: '#source-map'
}