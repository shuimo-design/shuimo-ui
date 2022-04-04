<template>
  <div>
    <w-popover :show="visible">
      <w-button text="click me me，出现吧！" @click="visible = true"/>
      <template #content>
        <div>
          <p>被你发现了，这是一个很长很长的popover</p>
          <div style="text-align: right; margin: 0">
            <w-button text="关闭" @click="visible = false"></w-button>
            <w-button text="确定" @click="visible = false"></w-button>
          </div>
        </div>
      </template>
    </w-popover>

    <w-popover hover>
      <w-button text="hover me me，出现吧！"></w-button>
      <template #content>
        <div>被你发现了，这是一个很长很长的popover</div>
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
