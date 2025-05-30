<template>
  <div>
    <div>{{ $t('山脉透明度') }}: {{ mountainsOpacity }}</div>
    <m-slider v-model="mountainsOpacity" :min="0" :max="1" :step="0.01" @change="handleOpacityChange"/>
  </div>
  <div>{{ $t('多宣纸同屏渲染时高频刷新页面会卡顿，例如上方滚动条滚动，请酌情使用') }}</div>

  <div class="white-wrapper">
    <m-rice-paper class="custom-opacity" :style="opacityStyle">
      <div class="content">{{ $t('自定义透明度') }}</div>
    </m-rice-paper>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const mountainsOpacity = ref(0.5);
const appliedOpacity = ref(0.5);

const handleOpacityChange = (value: number) => {
  appliedOpacity.value = value;
};

const opacityStyle = computed(() => {
  return {
    '--m-rp-mountains-opacity': appliedOpacity.value,
  };
});

</script>


<style scoped>
.custom-opacity {
  width: 500px;
  height: 500px;
}

.content {
  margin: 50px;
  height: 400px;
  width: 400px;
  background: var(--m-color-background);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: var(--m-color-text-dark);
}

.white-wrapper {
  display: inline-block;
  background-color: white;
  padding: 20px;
  margin-top: 10px;
}
</style>
