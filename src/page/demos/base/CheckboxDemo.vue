<template>
  <div>
    <w-checkbox label="A" v-model="checkedOriginal" value="a" @change="changeHandle"/>
    <w-checkbox label="B" disabled value="B" checked/>
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
    changeHandle(val, e) {
      console.log(val, e);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
