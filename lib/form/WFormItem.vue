<template>
  <div class="w-form-item">
    <label :for="labelFor" class="w-form-item__label">
      <slot name="label">{{label}}</slot>
    </label>
    <div class="w-form-item__content">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WFormItem",
    props: {
      label: String,
      prop: String
    },
    computed: {
      labelFor() {
        return this.prop;
      }
    }
  }
</script>

<style scoped>
</style>
