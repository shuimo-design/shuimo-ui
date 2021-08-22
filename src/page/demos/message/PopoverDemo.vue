<template>
  <div>
    <w-popover v-model:visible="visible">
      <p>被你发现了，这是一个很长很长的popover</p>
      <div style="text-align: right; margin: 0">
        <w-button text="别啊" @click="visible = true"></w-button>
        <w-button text="die！" @click="visible = false"></w-button>
      </div>
      <template #reference>
        <w-button text="click me me，出现吧！"></w-button>
      </template>
    </w-popover>
    <w-popover trigger="hover">
      <div>被你发现了，这是一个很长很长的popover</div>
      <template #reference>
        <w-button text="hover me me，出现吧！"></w-button>
      </template>
    </w-popover>
  </div>
</template>

<script>
  export default {
    name: "PopoverDemo",
    data() {
      return {
        visible: false
      }
    }
  }
</script>

<style scoped>

</style>
