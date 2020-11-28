<template>
  <div>
    <w-button text="点击显示普通弹窗" @click="show"/>
    <w-dialog :visible="dialogVisible" @close="close"
              :mask="maskOption">
      <div>
        <span>普通弹窗</span>
      </div>
    </w-dialog>
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
      maskOption: {
        show: true,
        clickClose: false
      }
    }
  },
  methods: {
    show() {
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
