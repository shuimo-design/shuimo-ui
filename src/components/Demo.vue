<template>
  <w-input value="hi"/>
  <w-button text="hi" @click="print"/>
  <w-button text="hi" :disabled="true" @click="print"/>
</template>

<script>
/**
 * @description
 * @author higuaifan
 * @date 2020/11/17 22:33
 **/

export default {
  name: "Demo",
  methods:{
    print(){
      console.log('hi');
    }
  }
};
</script>

<style scoped>

</style>
