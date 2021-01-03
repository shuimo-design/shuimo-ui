<template>
  <w-scroll-number :number="987654"/>
  <w-scroll-number :number="9876" left/>
  <w-scroll-number :number="9876" :speed="220" left/>
  <w-scroll-number :number="9876" type="together"/>
</template>

<script>
export default {
  name: "ScrollNumberDemo"
}
</script>

<style scoped>

</style>
