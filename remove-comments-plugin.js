// 自定义把打包后的js文件的开头注释去掉；
class RemoveCommentsPlugin {
  apply (compiler) { //  compiler 对象参数是webpack 工作过程中最核心的对象，里面包含了我们此次构建的所有配置信息
    console.log('RemoveCommentsPlugin 启动')
	 // API 文档中的介绍，我们找到一个叫作 emit 的钩子，这个钩子会在 Webpack 即将向输出目录输出文件时执行，
    // compiler => 包含了我们此次构建的所有配置信息
	compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
	  // compilation => 可以理解为此次打包的上下文
	  for (const name in compilation.assets) {
		console.log(name) // 输出文件名称
		if (name.endsWith('.js')) {
		  const contents = compilation.assets[name].source()
		  const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
		  compilation.assets[name] = {
			source: () => noComments,
			size: () => noComments.length
		  }
		}
	  }
	})
  }
}
module.exports = RemoveCommentsPlugin