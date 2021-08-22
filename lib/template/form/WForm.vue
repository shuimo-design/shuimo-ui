<template>
  <form class="w-form"
        :class="[{ 'w-form-inline': inline }]">
    <slot></slot>
  </form>
</template>

<script>
  export default {
    name: "WForm",
    props: {
      inline: Boolean
    }
  }
</script>

<style scoped>
</style>
