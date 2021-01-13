<template>
  <div>
    <w-input value="hi"/>
    <w-input value="hi,textarea" type="textarea"/>
    <span>输入的数字为：{{number}}</span>
    <w-input-number v-model:value="number" :max="100"/>
  </div>
</template>

<script>
/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2020/11/27 10:32 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export default {
  name: 'InputDemo',
  data() {
    return {
      number: 0
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
