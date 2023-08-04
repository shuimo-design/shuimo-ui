# 快速开始

## 安装

``` shell
npm install shuimo-ui

yarn add shuimo-ui

pnpm add shuimo-ui
```

### Vue

``` typescript
// main.ts
import { createMUI } from 'shuimo-ui';
import 'shuimo-ui/dist/style.css';

app.use(createMUI());
```

#### 按需引用

``` vue
<template>
  <MInput/>
</template>

<script setup>
import { MInput } from 'shuimo-ui';
</script>
```

### Nuxt

``` typescript
// plugins/vue-plugins.ts
import { createMUI } from 'shuimo-ui';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(WUI);
})
```

#### 样式引入

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    'shuimo-ui/dist/style.css'
  ]
})

```
