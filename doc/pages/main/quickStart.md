# {{$t(\'快速开始\')}}

## {{$t(\'安装\')}}

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

#### {{$t(\'按需引用\')}}

``` vue
<template>
  <MInput/>
</template>

<script setup>
import { MInput } from 'shuimo-ui';
</script>
```

### Nuxt

我们会尽快发布`@shuimo-design/nuxt`，目前可以通过以下方式引入

``` typescript
// modules/shuimo/index.ts
import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
export default defineNuxtModule({
  setup(options, nuxtApp) {

    const { resolve } = createResolver(import.meta.url);
    nuxtApp.hook('nitro:config', async nitroConfig => {
      nitroConfig.publicAssets ||= [];
      nitroConfig.publicAssets.push({
        dir: resolve('../../node_modules/shuimo-ui/public'),
        baseURL: 'm-shuimo',
        maxAge: 60 * 60 * 24 * 30
      });
    });
    addPlugin(resolve('./plugin.ts'));

    nuxtApp.options.css.push(resolve('../../node_modules/shuimo-ui/dist/style.css'));
  }
});

// modules/shuimo/plugin.ts

import { createMUI } from 'shuimo-ui';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(createMUI({
    disableWebComponent: ['MBorder', 'MRicePaper'],
    svgInject: 'nuxt'
  }));
});

```
