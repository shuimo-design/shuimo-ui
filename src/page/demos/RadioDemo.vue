<template>
  <div>
    <w-radio v-model="radio" label="1" @change="changeHandle" @before="beforeHandle">备选项</w-radio>
    <w-radio v-model="radio" label="2" @change="changeHandle" @before="beforeHandle">备选项2</w-radio>
  </div>
</template>

<script>
export default {
  name: "RadioDemo",
  data() {
    return {
      radio: '1'
    }
  },
  methods: {
    changeHandle(val) {
      console.log(`当前值---${this.radio}`);
      console.log(`change后---${val}`);
    },
    beforeHandle(val) {
      console.log(`当前值---${this.radio}`);
      console.log(`目标值---${val}`);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
