<template>
  <div>
    <m-button text="点击显示普通弹窗" @click="showNormal"/>
    <m-dialog :visible="dialogNormalVisible" @close="closeNormal">
      <div>
        <span>普通弹窗</span>
      </div>
    </m-dialog>
    <m-button text="点击显示弹窗" @click="showDialog"/>
    <m-dialog :visible="visible" @close="closeDialog"
              :mask="maskNoShowOption">
      <div class="height-600">
        <span>height:600</span>
      </div>
    </m-dialog>
  </div>
</template>


<script setup lang="ts">
/**
 * @description dialog demo
 * @author 阿怪
 * @date 2020/11/27 10:32 下午
 * @version v1.0.2
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *  v1.0.1 改为setup script写法
 *  v1.0.2 dialog参数管理使用useDialog
 */
import { reactive } from 'vue';
import { useDialog } from '../../../../lib';

const { visible, showDialog, closeDialog } = useDialog();
const { visible: dialogNormalVisible, showDialog: showNormal, closeDialog: closeNormal } = useDialog();
const { visible: dialogAdventureVisible, showDialog: showAdventure, closeDialog: closeAdventure } = useDialog();

const maskNoShowOption = reactive({ show: false, clickClose: false });

</script>

<style lang="scss" scoped>
</style>
