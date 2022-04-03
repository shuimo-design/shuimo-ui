<template>
  <div>
    <div>
      <BaseTitle :divider="false">细线</BaseTitle>
      <w-divider/>
    </div>
    <div>
      <BaseTitle :divider="false">竖线</BaseTitle>
      <div class="vertical-divider">
        <w-divider vertical/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**
 * @Description: 分割线demo
 * @Author: 菩萨蛮
 * @Date: 2021/2/23 4:10 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import BaseTitle from "../../../components/base/BaseTitle.vue";

</script>

<style lang="scss" scoped>

.vertical-divider {
  height: 500px;
  width: 10px;
}

</style>
