<template>
  <div>
    <w-button text="点击显示普通弹窗" @click="showNormal"/>
    <w-dialog :visible="dialogNormalVisible" @close="closeNormal">
      <div>
        <span>普通弹窗</span>
      </div>
    </w-dialog>
    <w-button text="点击显示弹窗" @click="showDialog"/>
    <w-dialog :visible="visible" @close="closeDialog"
              :mask="maskNoShowOption">
      <div class="height-600">
        <span>height:600</span>
      </div>
    </w-dialog>
    <w-button text="点击显示奇遇弹窗" @click="showAdventure"/>
    <w-adventure-dialog :visible="dialogAdventureVisible" @close="closeAdventure" @confirm="closeAdventure">
      <div class="adventure-tip">
        <span>今日份奇遇，获得了某物品奖励，恭喜你！</span>
      </div>
    </w-adventure-dialog>
  </div>
</template>


<script setup lang="ts">
/**
 * @Description: dialog demo
 * @Author: 菩萨蛮
 * @Date: 2020/11/27 10:32 下午
 * @Version v1.0.2
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
