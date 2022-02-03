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
 * @Version v1.0.1
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *  v1.0.1 改为setup script写法
 */
import { reactive, ref } from 'vue';

const dialogVisible = ref(false);
const dialogNormalVisible = ref(false);
const dialogAdventureVisible = ref(false);
const maskNoShowOption = reactive({ show: false, clickClose: false });

const show = () => {dialogVisible.value = true};
const showNormal = () => {dialogNormalVisible.value = true};
const close = () => {dialogVisible.value = false};
const closeNormal = () => {dialogNormalVisible.value = false};
const showAdventure = () => {dialogAdventureVisible.value = true};
const closeAdventure = () => {dialogAdventureVisible.value = false};

</script>

<style lang="scss" scoped>
</style>
