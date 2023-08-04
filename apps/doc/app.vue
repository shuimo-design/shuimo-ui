<template>
  <div class="shuimo-ui m-cursor">
    <Title>水墨UI</Title>
    <Loading v-if="isLoading" v-model="isLoading"/>
    <m-rice-paper v-else class="layout">
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
  return route.path !== '/';
});

const isLoading = ref(true);

useHead({
  meta: [
    { name: 'author', content: '极客江湖,阿怪,higuaifan' },
    { name: 'description', content: '一款粗暴的水墨UI' },
    { name: 'keywords', content: '水墨,ui,design,UI,UI design,丹青,wash painting,danqing' },
  ]
})
</script>
