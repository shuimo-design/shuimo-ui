<template>
  <div class="white-wrapper">
    <m-rice-paper class="filter-div" type="warm">
      <div class="inside-div">warm</div>
    </m-rice-paper>
    <m-rice-paper class="filter-div" type="cold">
      <div class="inside-div">cold</div>
    </m-rice-paper>
  </div>
</template>

<style scoped>

.white-wrapper {
  background: rgba(255, 255, 255, 0.9);
  height: 400px;
  width: 400px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.filter-div {
  width: 150px;
  height: 150px;
}


.inside-div {
  margin: 25px;
  height: 100px;
  width: 100px;
  background: var(--m-color-main);
  opacity: 0.2;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  color: black;
}
</style>
