<template>
  <div class="m-scroll">
    <div class="inside"></div>
  </div>
</template>

<style scoped>


.m-scroll {
  height: 400px;
  width: 400px;
  overflow: auto;
  border: 1px solid var(--m-color-border);
}

.inside {
  height: 800px;
  width: 800px;
  background: linear-gradient(140deg, var(--m-color-success) 0%, var(--m-color-warn) 50%, var(--m-color-error) 75%);
}

</style>
