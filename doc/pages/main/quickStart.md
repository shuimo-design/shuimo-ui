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

{{ $t(\'现在你可以直接使用命令：\') }}

```shell
pnpm dlx nuxi module add @shuimo-design/shuimo-ui-nuxt
```
