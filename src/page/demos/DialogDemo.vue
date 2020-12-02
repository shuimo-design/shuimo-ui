<template>
  <div>
    <w-button text="点击显示普通弹窗" @click="showNormal"/>
    <w-dialog :visible="dialogNormalVisible" @close="closeNormal">
      <div>
        <span>普通弹窗</span>
      </div>
    </w-dialog>
    <w-button text="点击显示弹窗" @click="show"/>
    <w-dialog :visible="dialogVisible" @close="close"
              :mask="maskNoShowOption">
      <div class="height-600">
        <span>height:600</span>
      </div>
    </w-dialog>
  </div>
</template>

<script>
/**
 * @Description:
 * @Author: 菩萨蛮
 * @Date: 2020/11/27 10:32 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export default {
  name: 'DialogDemo',
  data() {
    return {
      dialogVisible: false,
      dialogNormalVisible: false,
      maskNoShowOption: {
        show: false,
        clickClose: false
      }
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    showNormal() {
      this.dialogNormalVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    closeNormal() {
      this.dialogNormalVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.height-600 {
  height: 400px;
}
</style>
