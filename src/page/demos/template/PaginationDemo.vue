<template>
  <div>当前页{{current}}</div>
  <w-pagination :total="11" v-model:current="current"></w-pagination>
  <w-pagination :total="115" v-model:current="current1" :pageSize="20" @change="pageChangeHandle"></w-pagination>
</template>

<script>
  export default {
    name: "PaginationDemo",
    data() {
      return {
        current: 1,
        current1: 5
      }
    },
    methods: {
      pageChangeHandle(currentPage) {
        console.log(currentPage);
      }
    }
  }
</script>

<style scoped>

</style>
