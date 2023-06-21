<template>
  <div class="template">
    <div v-if="false">
      <m-form @submit="submitEvent">
        <m-form-item label="在下乃输入框：" prop="input">
          <m-input/>
        </m-form-item>
        <m-form-item label="在下乃按钮：" prop="hello">
          <m-button text="点击按钮"/>
        </m-form-item>
      </m-form>


      <span>current:{{ current }}</span>
      <m-pagination :total="225" v-model="current"></m-pagination>
    </div>


    <m-border>
      <div class="cell-wrapper">
        <m-cell>
          <div class="cell-inner">
            <span>无倾角</span>
          </div>
        </m-cell>
        <m-cell rotate-position="top-left" :deg="20" :h="80">
          <div class="cell-inner">
            <span>top-left</span>
          </div>
        </m-cell>
        <m-cell rotate-position="bottom-left" :deg="30" :h="80">
          <div class="cell-inner">
            <span>bottom-left</span>
          </div>
        </m-cell>
        <m-cell rotate-position="top-right" :deg="45" :h="80">
          <div class="cell-inner">
            <span>top-right top-right top-right top-right</span>
          </div>
        </m-cell>
        <m-cell rotate-position="bottom-right" :deg="30" :h="80">
          <div class="cell-inner">
            <span>bottom-right</span>
          </div>
        </m-cell>
      </div>
    </m-border>


  </div>
</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/4/24 17:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';


const submitEvent = () => {
  console.log('submitEvent');
};

const current = ref(1);

</script>

<style scoped>

.template {
}


.cell-wrapper {
  height: 600px;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.m-cell {

  margin-top: 5px;
}

.cell-inner {
  height: 80px;
  background: gray;
}

</style>
