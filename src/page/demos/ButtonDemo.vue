<template>
  <div>
    <w-button text="hi" @click="print"/>
    <w-button text="长长长长长长长长长长长长长长" :disabled="true" @click="print"/>
  </div>
</template>

<script>
/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2020/11/27 10:31 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export default {
  name: 'ButtonDemo',
  methods: {
    print() {
      console.log('hi');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
