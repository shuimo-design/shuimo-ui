<template>
  <div class="demo">
    <div class="menu">
      <template v-for="demo in demoList">
        <w-button :text="demo.name" @click="$router.push(`/${demo.url}`)"/>
      </template>
    </div>
    <div class="main">
      <router-view/>
    </div>
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
  data() {
    return {
      demoList: [
        { name: '按钮', url: 'button' },
        { name: '输入框', url: 'input' },
        { name: '选择框', url: 'select' },
        { name: '日期选择框', url: 'date-picker' },
        { name: '弹窗', url: 'dialog' },
        { name: '数字滚动', url: 'scroll-number' },
        { name: '悬浮提示', url: 'tooltip' },
        { name: '悬浮交互', url: 'popover' },
        { name: '提示', url: 'message' },
        { name: '表单', url: 'form' },
        { name: '分页', url: 'pagination' },
        { name: '文件上传', url: 'upload' },
        { name: '控制台输出', url: 'print' },
        { name: '分割线', url: 'divider' }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>

.demo {
  display: flex;
  height: 100vh;
  width: 100vw;

  & > div {
    display: inline-block;
    height: 100%;
  }

  .menu {
    width: 200px;
    border-right: 1px solid #999999;
  }

  .main {
    width: calc(100vw - 202px);
  }
}

.w-button {
  display: block;
}

</style>
