/**
 * @description 数字滚动单个组件
 * @author: 菩萨蛮
 * @date 2021/1/3 1:16 下午
 * @version V1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行
 */
import {h, defineComponent, CSSProperties, inject} from 'vue';

interface singleScrollNumberData {
  timer: number,
  computeNumber: Array<number>,
  style: CSSProperties
}

export default defineComponent({
  name: 'SingleScrollNumber',
  props: {
    number: {type: Number, default: 0}
  },
  setup() {
    const speed: number | undefined = inject('speed');
    const duration: number | undefined = inject('duration');
    return {
      speed,
      duration
    }
  },
  data(): singleScrollNumberData {
    return {
      timer: -1,
      computeNumber: [],
      style: {
        transform: undefined
      }
    }
  },
  mounted() {
    this.refresh();
  },
  render() {
    return (
      <span class="box-item">
        <span style={this.style}>0123456789</span>
      </span>)
  },
  methods: {
    setNumberTransform() {
      let number = 0;
      const {style, speed} = this;
      this.timer = setInterval(() => {
        style.transform = `translate(-50%,-${number * 10}%)`;
        number = number === 9 ? 0 : 9;
      }, speed);
    },
    setTimeoutClear() {
      const {style, duration, timer} = this;
      setTimeout(() => {
        clearInterval(timer);
        style.transform = `translate(-50%,-${this.number * 10}%)`;
      }, duration);
    },
    refresh() {
      this.setNumberTransform();
      this.setTimeoutClear();
    }
  }
})
