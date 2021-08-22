<template>
  <div class="tooltip-demo">
    <w-tooltip>
      <div style="height: 20px">hi,Tooltip</div>
      <template #content>
        <span>hello</span>
      </template>
    </w-tooltip>
    <w-tooltip>
      <w-button text="hi,Tooltip"/>
      <template #content>
        <span>hello</span>
      </template>
    </w-tooltip>
    <w-tooltip>
      <w-button text="hi,Tooltip"/>
      <template #content>
        <span>很长很长的乱78糟的数据很长很长的乱78糟的数据</span>
        <br/>
        <span>甚至还换了行</span>
      </template>
    </w-tooltip>
  </div>
</template>

<script>
export default {
  name: 'TooltipDemo'
}
</script>

<style scoped>

</style>
