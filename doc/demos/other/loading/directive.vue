<template>
  <m-button @click="toggleLoading">{{ t('切换loading状态') }}</m-button>
  <div class="loading-div" v-loading="isLoading">
    <span>{{ t('需要注意这块内容是会mount的。') }}</span>
    <br/>
    <span>{{ t('且父dom的position属性会强制设置为relative') }}</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const { t } = useI18n();
const isLoading = ref(true);
const toggleLoading = () => isLoading.value = !isLoading.value;
</script>

<style scoped>
.loading-div {
  height: 200px;
  width: 200px;
}
</style>
