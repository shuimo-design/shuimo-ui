<template>
  <div>
    <span>{{ data }}</span>
    <span>普通输入框</span>
    <w-input v-model="data"/>
    <w-input v-model="emptyData" placeholder="请输入文字"/>
    <br/>
    <span>多文本输入框</span>
    <w-input v-model="data" type="textarea"/>
    <br/>
    <span>密码框</span>
    <w-input v-model="data" type="password"/>
    <br/>
    <span>输入的数字为：{{ number }}</span>
    <w-input-number v-model="number" :max="100"/>
    <br/>
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
      data: '3333',
      emptyData: '',
      number: 0
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
