<div align="center">
<h1>vue2-demo</h1>
<p>
  <strong>Build applicationDemo with vue2＋ele </strong>
  <br /><br />
  <strong>Vue2的基础模板，拉了个分支接上element</strong>
</p>
<p>
  <sub>Made with ❤︎ by
    <a href="https://github.com/vulcan09">Vulcan09</a>
  </sub>
</p>
<p>
<a href="https://github.com/vulcan09/vue2-demo"><img src="https://img.shields.io/badge/Github Page-Vue2Demo-yellow" /></a>
<a href="https://github.com/vulcan09"><img src="https://img.shields.io/badge/Author-Vulcan09-blueviolet" /></a>
</div>

---

### 基础配置
- [x] base样式
- [x] axios封装
- [x] vuex模块化
- [x] 配置eslint和prettier
    - webstorm 可以在配置里面用默认的，只要你不进行一些花里胡哨的操作
    - 配置参考掘金的这一篇文章 [Vuecli接入eslint和preitter](https://juejin.cn/post/6850037281957838855#heading-8)

### webpack
- [x] 多核构建
- [x] gzip
- [ ] 图片压缩
- [ ] css 输出重构
- [x] js 输出重构
- [x] scss 全局变量

### babel
- [x] 可选链 ?.
- [x] 空值合并 ??
``` js
npm install xxx -S
'@babel/plugin-proposal-optional-chaining', //可选链
'@babel/plugin-proposal-nullish-coalescing-operator' //空值合并
```
