<template>
  <div>
    <span>选择的日期为{{date}}</span>
    <w-date-picker v-model:value="date"/>
  </div>
</template>

<script>
  export default {
    name: "DatePickerDemo",
    data() {
      return {
        date: '2021-01-01'
      }
    }
  }
</script>

<style scoped>

</style>
