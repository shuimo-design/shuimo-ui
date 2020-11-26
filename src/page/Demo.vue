<template>
  <div class="demo">
    <w-input value="hi"/>
    <w-button text="hi" @click="print"/>
    <w-button text="长长长长长长长长长长长长长长" :disabled="true" @click="print"/>


    <w-button text="点击显示弹窗" @click="show"/>
    <w-dialog :visible="dialogVisible" @close="close"
              :mask="maskOption">
      <div class="height-600">
        <span>height:600</span>
      </div>
    </w-dialog>
  </div>
</template>

<script>
/**
 * @description
 * @author higuaifan
 * @date 2020/11/17 22:33
 **/

export default {
  name: "Demo",
  data() {
    return {
      dialogVisible: false,
      maskOption: {
        show: true,
        clickClose: false
      }
    }
  },
  methods: {
    print() {
      console.log('hi');
    },
    show() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>

.demo {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.height-600 {
  height: 400px;
}

</style>
