
/**
 * 自定义markdown loader：
 * 每个 Webpack 的 Loader 都需要导出一个函数，
 * 这个函数就是我们这个 Loader 对资源的处理过程，
 * 它的输入就是加载到的资源文件内容，
 * 输出就是我们加工后的结果。
 * 
 * */ 
const marked = require('marked') // 处理成为html字符串
// 方法一: 配合marked,最后认为转化js代码
module.exports = source => {
  // 加载到的模块内容(source) => '# About\n\nthis is a markdown file.'
  console.log(source)
  
  // 1、将markdown转化成html字符串
  const html = marked(source)
  // 2、将html字符串凭借成一段字符串的js代码（ // 注意：loader最后返回的结果只能是js）
  const code = `module.exports = ${JSON.stringify(html)}`
  // 返回值就是最终被打包的内容
  return code
}
// f方法二： 配合marked, html-loader
// module.exports = source => {
//   // 加载到的模块内容(source) => '# About\n\nthis is a markdown file.'
//   // 1、将markdown转化成html字符串
//   const html = marked(source)
//   // 返回值就是最终被打包的内容
//   return html
// }

