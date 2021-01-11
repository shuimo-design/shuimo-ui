<template>
  <div>
    <span>form-block</span>
    <w-form>
      <w-form-item label="input输入：" prop="hello">
        <w-input value="hello, form"/>
      </w-form-item>
      <w-form-item label="日期选择：" prop="hello">
        <w-date-picker v-model:value="month" type="month"/>
      </w-form-item>
      <w-form-item label="textarea输入：" prop="hello">
        <w-input value="hello, form" type="textarea"/>
      </w-form-item>
    </w-form>
    <span>form-inline</span>
    <w-form inline>
      <w-form-item label="input输入：" prop="hello">
        <w-input value="hello, form"/>
      </w-form-item>
      <w-form-item label="日期选择：" prop="hello">
        <w-date-picker v-model:value="month" type="month"/>
      </w-form-item>
      <w-form-item label="选项：" prop="hello">
        <w-select v-model:value="selectVal" :options="options" :keyParam="'title'" @select="select"/>
      </w-form-item>
    </w-form>
  </div>
</template>

<script>
  export default {
    name: "FormDemo",
    data() {
      return {
        month: '',
        selectVal: 'psm',
        selected: { title: '未选择' },
        options: [
          { title: 'psm', value: 1 },
          { title: 'ngz', value: 2 },
          { title: 'kh3', value: 3 },
          { title: 'ljx', value: 4 },
        ]
      };
    },
    methods: {
      select(option) {
        this.selected = option;
      }
    }
  }
</script>

<style scoped>

</style>
