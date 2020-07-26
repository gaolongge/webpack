// import { Configuration } from 'webpack'


/*
 webpack内部默认只能够处理 JS 模块代码，当遇到其他类型的模块式时，需要对应的loade去处理
*/

const path = require('path')

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
	}

}
module.exports = config