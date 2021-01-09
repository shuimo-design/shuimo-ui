<template>
  <div>
    <w-button text="点击出现Message" @click="callMessage"/>
  </div>
</template>

<script>
/**
 * @Description: Message弹窗Demo
 * @Author: 菩萨蛮
 * @Date: 2021/1/9 4:54 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export default {
  name: 'MessageDemo',
  data() {
    return {
      flag: 0
    }
  },
  methods: {
    callMessage() {
      this.flag++;
      this.$message({ content: `这是第${this.flag}条message` });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
