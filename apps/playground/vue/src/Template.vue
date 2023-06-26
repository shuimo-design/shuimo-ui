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
      <m-grid :gap="20" direction="column" class="screen">
        <m-grid :gap="5" :h="245">
          <m-cell :w="245">
            <img src="../assets/left.png" alt="">
          </m-cell>
          <m-cell>
            <img src="../assets/right.png" alt="">
          </m-cell>
        </m-grid>
        <m-grid :gap="5" :h="162" :gapRotate="[4, 20]">
          <m-cell :w="162">
            <img src="../assets/1.png" alt="">
          </m-cell>
          <m-cell>
            <img src="../assets/3.png" alt="">
          </m-cell>
          <m-cell>
            <img src="../assets/2.png" alt="">
          </m-cell>
        </m-grid>
      </m-grid>

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

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.screen {
  width: 500px;
  height: 728px;
}

.template-cell {
  margin-left: -58px;
}

</style>
