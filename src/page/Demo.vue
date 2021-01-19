<template>
  <div class="demo">
    <form-demo/>
    <input-demo/>
    <button-demo/>
    <pagination-demo/>
    <dialog-demo/>
    <tooltip-demo/>
    <scroll-number-demo/>
    <select-demo/>
    <date-picker-demo/>
    <popover-demo/>
    <message-demo/>
    <upload-demo/>
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
import DatePickerDemo from "./demos/DatePickerDemo.vue";
import PopoverDemo from "./demos/PopoverDemo.vue";
import MessageDemo from "./demos/MessageDemo.vue";
import FormDemo from "./demos/FormDemo.vue";
import PaginationDemo from "./demos/PaginationDemo.vue";
import UploadDemo from "./demos/UploadDemo.vue";

export default {
  name: "Demo",
  components: {
    ButtonDemo,
    InputDemo,
    DialogDemo,
    TooltipDemo,
    ScrollNumberDemo,
    SelectDemo,
    DatePickerDemo,
    PopoverDemo,
    MessageDemo,
    FormDemo,
    PaginationDemo,
    UploadDemo
  }
};
</script>

<style lang="scss" scoped>

.demo {
  margin: 20px;
}

</style>
