# Shuimo UI Nuxt module

[![npm version][npm-version-src]][npm-version-href]
[![nuxt npm version][npm-nuxt-version-src]][npm-nuxt-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

[Shuimo UI](https://github.com/shuimo-design/shuimo-ui) module for [Nuxt](https://nuxt.com/)

# Features

- 🧩 Automatically import components and styles on demand.
- ✨ Provide Some useful layout components.

# Quick Setup

1. Add `@shuimo-design/shuimo-ui-nuxt` dependency to your project

```bash
npx nuxi@latest module add shuimo-design
```

2. Add `shuimo-ui` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    '@shuimo-design/shuimo-ui-nuxt'
  ]
})
```

That's it! You can now use Shuimo UI in your Nuxt app ✨

# Usage

You can use `shuimo-ui` create a website like this:
<img src="https://github.com/shuimo-design/shuimo-ui/blob/main/.github/README/example.webp?raw=true">

## Components: `MLoadingPreview`

We provide a component called `MLoadingPreview`.
you can used it when you want to do some time-consuming operations like preload some assets and show a loading animation.

```vue

<template>
  <div>
    <client-only>
      <MLoadingPreview v-model="isLoading" v-if="isLoading" :preInit="preInit"/>
    </client-only>
    <your-main-display-component v-if="!isLoading">

    </your-main-display-component>
  </div>
</template>


<script setup lang="ts">

  const isLoading = ref(true);

  const preInit = async () => {
    await import('ASSET_URL');
    // or other time-consuming operations
    return true;
  };
</script>
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/shuimo-ui?style=flat&colorA=020420&label=shuimo-ui%40latest&color=861717
[npm-version-href]: https://npmjs.com/package/shuimo-ui

[npm-nuxt-version-src]: https://img.shields.io/npm/v/@shuimo-design/shuimo-ui-nuxt?style=flat&colorA=020420&label=shuimo-ui-nuxt%40latest&color=861717
[npm-nuxt-version-href]: https://npmjs.com/package/@shuimo-design/shuimo-ui-nuxt


[npm-downloads-src]: https://img.shields.io/npm/dm/shuimo-ui.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/shuimo-ui

[license-src]: https://img.shields.io/npm/l/shuimo-ui.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/shuimo-ui

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
