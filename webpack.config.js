// import { Configuration } from 'webpack'


/*
 webpack内部默认只能够处理 JS 模块代码，当遇到其他类型的模块式时，需要对应的loade去处理
*/
const path = require('path');

// 清除目录插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 自动生成html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拷贝文件和文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 删除打包的js文件的开头注释的自定义插件
const RemoveCommentsPlugin = require('./remove-comments-plugin');

/*
* @type {Configuration}
*/
const config = {
	entry: './src/main.js', // 入口文件： 单入口，多入口都可以
	output: {
		path: path.join(__dirname, 'dist'), // c出口文件路径
		filename: 'bundle.js', // 打包出口文件名字
	},
	/*
	  模式：mode
		1、 production:  启动内置优化插件，自动优化打包结果，打包速度偏慢
		2、 development：自动优化打包速度，添加一些调试过程中辅助插件以便于更好的调试错误
		3、 none: 运行最原始的打包，不做任何额外处理，这种模式一般需要分析我们模块的打包结果是会用到
	*/
	mode: 'none',
	module: {
		rules: [
			{
				// css-loader 只会把css模块加载到JS代码中，而并不会使用这个模块
				test: /\.css$/i, // css结尾的文件
				// use: 'css-loader' // 指定具体的loader，处理css文件
				/*
				  use: 是数组时，执行个loader时，是从后往前加载：如先加载css-loader,在style-loader
				*/
				use: [
					'style-loader',
					'css-loader'
				]
			},
		    {   // 自定义markdown的loader： 方法一: 配合markedloader
				test: /\.md$/,
				// 使用相对路径
				use: './markdown-loader'
			},
			// {   // // 自定义markdown的loader： 方法二: 配合html-loader
			// 	test: /\.md$/,
			// 	// 使用相对路径
			// 	use: [
			// 		'html-loader',
			// 		'./markdown-loader'
			// 	]
			// }
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		// 输出多个 HTML 文件：就多个 new HtmlWebpackPlugin的实例 
		new HtmlWebpackPlugin({
		  title: 'Webpack Plugin(HtmlWebpackPlugin) Sample', // 生成html文件的标题
		  meta: {
			viewport: 'width=device-width'
		  },
		  template: './src/index.html'  // 模板
		}),
		// 用于生成 about.html
		new HtmlWebpackPlugin({
		  filename: 'about.html', // 输出的html的文件名称
		  minify: {}, // minify 的作用是对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 。默认值为false, 不对生成的 html 文件进行压缩。
		  hash: true, // hash选项的作用是 给生成的 js 文件一个独特的 hash 值
		  
		}),
		// 拷贝文件和文件夹
		new CopyWebpackPlugin({
		  patterns: [
			//  from: 从哪个文件夹开始复制， to: 复制到要打包的文件下的名字
			{ from: './public', to: 'public' },
		  ],
		}),
		new RemoveCommentsPlugin()
		
	]

}
module.exports = config