<template>
  <w-popover>
    <p>被你发现了，这是一个很长很长的popover</p>
    <div style="text-align: right; margin: 0">
      <w-button text="别啊"></w-button>
      <w-button text="die！"></w-button>
    </div>
    <template #reference>
      <w-button text="出现吧！"></w-button>
    </template>
  </w-popover>
</template>

<script>
  export default {
    name: "PopoverDemo"
  }
</script>

<style scoped>

</style>
