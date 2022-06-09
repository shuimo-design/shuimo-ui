<template>
  <div>
    <m-popover :show="visible">
      <m-button text="click me me，出现吧！" @click="visible = true"/>
      <template #content>
        <div>
          <p>被你发现了，这是一个很长很长的popover</p>
          <div style="text-align: right; margin: 0">
            <m-button text="关闭" @click="visible = false"></m-button>
            <m-button text="确定" @click="visible = false"></m-button>
          </div>
        </div>
      </template>
    </m-popover>

    <m-popover hover>
      <m-button text="hover me me，出现吧！"></m-button>
      <template #content>
        <div>被你发现了，这是一个很长很长的popover</div>
      </template>
    </m-popover>
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
