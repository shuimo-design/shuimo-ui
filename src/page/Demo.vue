<template>
  <div class="demo">
    <input-demo/>
    <button-demo/>
    <dialog-demo/>
    <tooltip-demo/>
    <scroll-number-demo/>
    <select-demo/>
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
import TooltipDemo from "./demos/TooltipDemo.vue";
import ScrollNumberDemo from "./demos/ScrollNumberDemo.vue";
import SelectDemo from "./demos/SelectDemo.vue";

export default {
  name: "Demo",
  components: {
    ButtonDemo, InputDemo, DialogDemo, TooltipDemo, ScrollNumberDemo, SelectDemo
  }
};
</script>

<style lang="scss" scoped>

.demo {
  margin: 20px;
}

</style>
