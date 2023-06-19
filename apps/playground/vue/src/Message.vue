<template>
  <div class="flex">
    <div class="hide" v-if="false">
      <m-popover hover>
        <m-button text="将毛笔移入试试"/>
        <template #content>
          <div>君不见，黄河之水天上来</div>
        </template>
      </m-popover>

      <m-dialog>
        <template #active>
          <m-button>点击这里</m-button>
        </template>
        <div>
          <h1>这里是dialog</h1>
        </div>
      </m-dialog>

      <m-drawer>
        <template #active>
          <m-button>点击这里</m-button>
        </template>
        <div>
          <h1>这里是drawer</h1>
        </div>
      </m-drawer>

      <div class="tooltip">
        <m-tooltip>
          <m-button text="点击触发"/>
          <template #content>
            <span>君不见，黄河之水天上来</span>
          </template>
        </m-tooltip>
      </div>

      <m-button @click="activeConfirm">测试</m-button>


      <m-button @click="callMessage">显示</m-button>
      <m-button @click="callMessage2">显示2</m-button>
    </div>

    <m-button @click="callMessage">显示</m-button>
    <m-button @click="callMessage2">显示2</m-button>

  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/4/24 22:27
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MConfirm, MMessage } from 'shuimo-ui/index';

const activeConfirm = async () => {
  const res = await MConfirm({ content: '测试' });
  console.log(res);
};


const callMessage = () => {
  MMessage.success('success的message', -1);
  MMessage.warning('warning的message');
  MMessage.info('info的message');
  MMessage({ content: 'normal', direction: 'top-right', duration: -1 });
  MMessage({ content: 'normal', direction: 'top-left', duration: -1 });
  MMessage({ content: 'normal', direction: 'top-center', duration: -1 });
  MMessage({ content: 'normal', direction: 'bottom-left', duration: -1 });
  MMessage({ content: 'normal', direction: 'bottom-right', duration: -1 });
};
const callMessage2 = () => {
  // MMessage.success('success的message');
  // MMessage.warning('warning的message');
  // MMessage.info('info的message');
  MMessage({
    content: 'normal',
    direction: 'top-center'
  });
};

</script>

<style scoped>

.tooltip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
