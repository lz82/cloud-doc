# tips

- remote
  `10.1.2`版本中 remote 默认是关闭的，需要手动声明`webPreferences: {enableRemoteModule: true}`。

- 在`typescript`中启用`css module`,需要在`react-app-env.d.ts`中做以下声明:

```
declare module '*.module.less' {
  const css: { readonly [key: string]: string };

  export default css;
}
```

- install electron
  `electron`因为需要安装`chrome`，所以需要翻墙，不要看网上那些使用镜像什么的，直接使用`cnpm install`即可，简单粗暴

- 在 electron 中使用 react-devtools 调试
  百度搜的话很多方法都已经失效了，最新的是在`session.loadExtension`，但是还是要翻墙去下载插件
  最方便的办法是使用`electron-devtools-installer`,同时在`main.js`中使用:

```
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

await installExtension(REACT_DEVELOPER_TOOLS);
```

注意：这个也必须有梯子才行，因为它其实也是在打开`electron`的时候才去下载这个扩展

- 第三方 js
  有一些第三方的 sdk 使用方式是直接在`index.html`中引入，这时候在`typescript`中使用会报错，提示`window`中没有这个对象
  同样也是在`react-app-env.d.ts`中`declare`一下即可。

```
declare var YpRiddler;
```
