<template>
  <div :class="['w-input', {'w-textarea':type === 'textarea'}]">
    <input type="text" class="w-input-inner" v-model="value" v-if="type!=='textarea'"/>
    <textarea v-else class="w-textarea-inner" :rows="10" v-model="value"/>
  </div>
</template>

<script lang="ts">
/**
 * @description
 * @author higuaifan
 * @date 2020/11/17 22:03
 **/

export default {
  name: "WInput",
  props: {
    type: {type: String, default: 'text'},
    value: {type: null, default: ''}
  }
};
</script>

<style scoped lang="scss">
</style>
