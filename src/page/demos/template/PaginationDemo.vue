<template>
  <div>当前页{{current}}</div>
  <m-pagination :total="11" v-model:current="current"></m-pagination>
  <m-pagination :total="115" v-model:current="current1" :pageSize="20" @change="pageChangeHandle"></m-pagination>
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
