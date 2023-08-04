# vite-markdown 模块

由于`nuxt`中会出现`?macro=true`后缀的`.md`文件，

并且需要管理每次处理时的import方法的数组，为了方便`debug`，因此扩展了
[vite-plugin-md](https://github.com/antfu/vite-plugin-md)
这个库。

前置添加了`findDemo`方法来查找`:::demo`,

后置添加了`insertImport`方法来插入组件和`import`。

具体逻辑可以阅读`demo.ts`这个文件。

## 外部nuxt模块逻辑

> todo 要不把外面的 markdown.ts 放到文件夹中吧？

再次由于`nuxt`的特性，和`vite`的特性，需要添加以下`plugin`，

``` typescript
  addVitePlugin(Vue({
    include: [/\.md/],
    exclude: [/\.vue$/]
  }));
```

注意一定要`exclude`掉`.vue`后缀的文件。
