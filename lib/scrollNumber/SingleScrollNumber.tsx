/**
 * @description 数字滚动单个组件
 * @author: 菩萨蛮
 * @date 2021/1/3 1:16 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */
import {h, defineComponent} from 'vue';

export default defineComponent({
  name: 'SingleScrollNumber',
  props: {
    number: {
      type: Number, default: 0
    }
  },
  inject: ['speed', 'duration'],
  data() {
    return {
      timer: null,
      computeNumber: []
    }
  },
  mounted() {
    this.refresh();
  },
  unmounted() {

  },
  render() {
    return (
      <span class="box-item">
        <span ref={`numberDom`}>0123456789</span>
      </span>)
  },
  methods: {
    setNumberTransform() {
      let number = 0;
      this.timer = setInterval(() => {
        const elem = this.$refs['numberDom'];
        if (elem) {
          elem.style.transform = `translate(-50%,-${number * 10}%)`;
        }
        number = number === 9 ? 0 : 9;
      }, this.speed);
    },
    setTimeoutClear() {
      setTimeout(() => {
        clearInterval(this.timer);
        const elem = this.$refs['numberDom'];
        if (elem) {
          elem.style.transform = `translate(-50%,-${this.number * 10}%)`;
        }
      }, this.duration);
    },
    refresh() {
      this.setNumberTransform();
      this.setTimeoutClear();
    }
  }
})
