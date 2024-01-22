<script setup lang="ts">
import { ref } from 'vue';

const riceVisibleRef = ref(true);
const toggleVisible = () => riceVisibleRef.value = !riceVisibleRef.value;
</script>

<template>
  <div class="animation">
    <m-button @click="toggleVisible">点我试试</m-button>
    <transition name="m-layout">
      <div class="filter-div" v-if="riceVisibleRef">
        <m-rice-paper>
          <div class="inside-div"/>
        </m-rice-paper>
      </div>
    </transition>
  </div>
</template>

<style scoped>


.filter-div {
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
}

.inside-div {
  margin: 25px;
  height: 350px;
  width: 350px;
  background: var(--m-color-main);
  opacity: 0.2;
  border-radius: 50%;
}

.animation {
  height: 500px;
  width: 500px;
}

/*!* if you want some animation *!*/
/* you should put theme in global style */
.m-layout-enter-active, .m-layout-leave-active {
  --m-layout-speed: 0.8s;
  transition: all var(--m-layout-speed);

  .m-rice-paper-layout {
    transition: all var(--m-layout-speed);
  }

  .m-m-left, .m-m-right {
    transition: all calc(var(--m-layout-speed) / 2);
  }

}

.m-layout-enter-from, .m-layout-leave-to {
  /** for nuxt layout **/
  /*.m-rice-paper-hover {*/
  /*  visibility: hidden;*/
  /*}*/

  .m-rice-paper-layout {
    opacity: 0;
  }

  .m-m-left {
    transform: translateX(calc(var(--m-m-left-w) * -1));
  }

  .m-m-right {
    transform: translateX(var(--m-m-right-w));
  }

}

.m-layout-enter-to, .m-layout-leave-from {

  .m-rice-paper-layout {
    opacity: 1;
  }

  .m-m-left, .m-m-right {
    transform: translateX(0);
  }

  .m-rice-paper-hover {
    visibility: visible;
  }
}

</style>
