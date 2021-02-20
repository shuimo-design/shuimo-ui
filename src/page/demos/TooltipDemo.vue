<template>
  <div>
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
        <span>hello</span>
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
