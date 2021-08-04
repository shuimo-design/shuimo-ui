<template>
  <div>
    <span>选择的title:{{ selected.title }}</span>
    <br/>
    <span>参数defaultValue:{{ defaultValue }}</span>
    <br/>
    <span>参数defaultValue2:{{ defaultValue2 }}</span>
    <br/>
    <span>参数defaultValue3:{{ defaultValue3 }}</span>
    <br/>
    <span>修改参数 defaultValue: <w-input v-model="defaultValue"/></span>
    <br/>
    <w-select v-model="defaultValue" :options="options" @select="select"/>
    <w-select v-model="defaultValue2" :options="options" :keyParam="'title'" @select="select"/>
    <w-select v-model="defaultValue3" :options="options2" :keyParam="'title'" @select="select"/>
  </div>
</template>

<script>
/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2021/1/3 4:20 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export default {
  name: 'SelectDemo',
  data() {
    return {
      defaultValue: '1',
      defaultValue2: 'psm',
      defaultValue3: 'ljx',
      selected: { title: '未选择' },
      options: [
        { title: 'psm', value: '1' },
        { title: 'ngz', value: '2' },
        { title: 'kh3', value: '3' },
        { title: 'ljx', value: '4' },
      ],
      options2: [
        { title: 'psm', value: 1 },
        { title: 'ngz', value: 2 },
        { title: 'kh3', value: 3 },
        { title: 'ljx', value: 4 },
        { title: 'sy', value: 5 },
        { title: 'ljx', value: 4 },
        { title: 'ljx', value: 4 },
        { title: 'ljx', value: 4 },
        { title: 'ljx', value: 4 },
      ]
    }
  },
  methods: {
    select(option) {
      this.selected = option;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
