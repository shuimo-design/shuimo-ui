<template>
  <div>
    <span>选择的日期为{{date}}</span>
    <w-date-picker v-model:value="date"/>
    <span>选择的月份为{{month}}</span>
    <w-date-picker v-model:value="month" type="month"/>
  </div>
</template>

<script>
  export default {
    name: "DatePickerDemo",
    data() {
      return {
        date: '',
        month: ''
      }
    }
  }
</script>

<style scoped>

</style>
