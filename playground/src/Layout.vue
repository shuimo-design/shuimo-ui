<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2024/1/22 01:32
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';

</script>

<template>

  <div>
    <m-border>
      <m-grid :gap="20" direction="column" class="screen">
        <m-grid :gap="5" :h="245">
          <m-cell :w="245">
            <img src="./assets/left.png" alt="">
          </m-cell>
          <m-cell>
            <img src="./assets/right.png" alt="">
          </m-cell>
        </m-grid>
        <m-grid :gap="5" :h="162" :gapRotate="[4, 20]">
          <m-cell :w="162">
            <img src="./assets/1.png" alt="">
          </m-cell>
          <m-cell>
            <img src="./assets/3.png" alt="">
          </m-cell>
          <m-cell>
            <img src="./assets/2.png" alt="">
          </m-cell>
        </m-grid>
      </m-grid>

    </m-border>
  </div>

</template>

<style scoped>
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
</style>
