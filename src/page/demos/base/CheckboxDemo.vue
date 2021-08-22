<template>
  <div>
    <w-checkbox v-model="checkedOriginal" @change="changeHandle">备选项</w-checkbox>
    <w-checkbox v-model="checked" true-label="选中返回值" false-label="未选中返回值" @change="changeHandle">备选项1</w-checkbox>
  </div>
</template>

<script>
export default {
  name: "CheckboxDemo",
  data() {
    return {
      checked: '选中返回值',
      checkedOriginal: true
    };
  },
  methods: {
    changeHandle(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
