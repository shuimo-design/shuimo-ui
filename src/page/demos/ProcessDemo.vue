<template>
  <div class="process">
    <span>进度条</span>
    <w-process :per="0.7"/>
    <br/>
    <w-process :per="loopPer"/>
    <br/>
    <w-process :height="38" :width="898" :per="loopPer"
               :text="`进度条百分比:${Math.floor(loopPer*100)}%`"
               :prepend="{text:'exp'}"/>
    <br/>
    <w-process :height="38" :width="898" :per="0.1" text="测试文案" :prepend="{text:'exp',position:'right'}"/>
  </div>
</template>

<script>
/**
 * @Description: 进度条demo
 * @Author: 菩萨蛮
 * @Date: 2021/2/25 2:44 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */

export default {
  name: 'ProcessDemo',
  data() {
    return {
      loopPer: 0
    }
  },
  mounted() {
    const self = this;
    setInterval(() => {
      if (self.loopPer < 1) {
        self.loopPer += 0.001;
      } else {
        self.loopPer = 0;
      }
    }, 16);
  }
};
</script>

<style lang="scss" scoped>
.process {
  height: calc(100vh - 40px);
  background: #d0d0d0;
  padding: 20px;
}


.w-process {
  width: 449px;
  height: 19px;
}

</style>
