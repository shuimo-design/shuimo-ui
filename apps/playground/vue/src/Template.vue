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
    </div>
    <span>current:{{current}}</span>
    <m-pagination :total="225" v-model="current"></m-pagination>

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
import {ref} from 'vue';


const submitEvent = ()=> {
  console.log('submitEvent');
}

const current = ref(1);

</script>

<style scoped>

.template{
  width: 100%;
}

</style>
