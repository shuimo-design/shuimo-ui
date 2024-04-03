<template>
  <div class="shuimo-ui m-cursor">
    <Title>水墨UI</Title>
    <client-only>
      <MLoadingPreview v-model="isLoading" v-if="isLoading" :preInit="preInit"/>
    </client-only>
    <m-rice-paper v-if="!isLoading" class="layout">
      <BaseHeaderBase :show-index-button="showIndexButton"/>
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </m-rice-paper>
  </div>
</template>


<script setup lang="ts">
const route = useRoute();
const showIndexButton = computed(() => {
  return route.path !== '/' && route.path !== '/zh' && route.path !== '/en';
});

const isLoading = ref(true);

const preInit = async () => {
  await import('assets/style/markdown.css');
  await import('assets/style/shikiji.css');
  return true;
};

useHead({
  meta: [
    { name: 'author', content: '极客江湖,阿怪,higuaifan' },
    { name: 'description', content: '一款粗暴的水墨UI' },
    { name: 'keywords', content: '水墨,ui,design,UI,UI design,丹青,wash painting,danqing' },
  ],
});

</script>
