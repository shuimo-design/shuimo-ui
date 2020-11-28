<template>
  <div class="demo">
    <input-demo/>
    <button-demo/>
    <dialog-demo/>
  </div>
</template>

<script>
/**
 * @description
 * @author higuaifan
 * @date 2020/11/17 22:33
 **/
import ButtonDemo from "./demos/ButtonDemo.vue";
import InputDemo from "./demos/InputDemo.vue";
import DialogDemo from "./demos/DialogDemo.vue";

export default {
  name: "Demo",
  components: {
    ButtonDemo, InputDemo, DialogDemo
  }
};
</script>

<style scoped>

.demo {
  width: 60vw;
  height: 60vh;
  padding: 20vh 20vw;
}

.demo > div {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
