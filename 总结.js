/**
 * laoder: 现不同种类资源模块加载;
 *   如：  css-loader 先把 CSS 代码转换为 JS 模块，才可以正常打包;
 *         style-loader 将 css-loader 中所加载到的所有样式模块，通过创建 style 标签的方式添加到页面上。
 * 
 * 即便是通过 JS 代码去加载的 CSS 模块，css-loader 和 style-loader 仍然可以正常工作。
 * 因为 Webpack 在打包过程中会循环遍历每个模块，然后根据配置将每个遇到的模块交给对应的 Loader 去处理，
 * 最后再将处理完的结果打包到一起。
 * 
 * 为什么要在 JS 中加载其他资源?
 * 
 * Webpack 为什么要在 JS 中载入 CSS 呢？不是应该将样式和行为分离么？
 * 可能你乍一想好像不太容易理解，那你可以做一个假设：假设我们在开发页面上的某个局部功能时，需要用到一个样式模块和一个图片文件。
 * 如果你还是将这些资源文件单独引入到 HTML 中，然后再到 JS 中添加对应的逻辑代码。试想一下，如果后期这个局部功能不用了，
 * 你就需要同时删除 JS 中的代码和 HTML 中的资源文件引入，也就是同时需要维护这两条线。而如果你遵照 Webpack 的这种设计，
 * 所有资源的加载都是由 JS 代码控制，后期也就只需要维护 JS 代码这一条线了。
 *  所以说，通过 JavaScript 代码去引入资源文件，或者说是建立 JavaScript 和资源文件的依赖关系，具有明显的优势。
 * 因为 JavaScript 代码本身负责完成整个应用的业务功能，放大来说就是驱动了整个前端应用，
 *  而 JavaScript 代码在实现业务功能的过程中需要用到样式、图片等资源文件。
 * 
 * 
 * 
 * 
 * 
 * 
 * */