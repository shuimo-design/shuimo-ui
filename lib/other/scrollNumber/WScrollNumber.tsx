/**
 * @description 数组滚动组件
 * @author: 南歌子
 * @date 2020/12/23 20:49
 * @version V1.1.0
 *
 * V1.1.0 @author 阿怪 添加同时滚动的类型选择、速度、时间提供修改入口
 */

import {h, defineComponent, provide, CSSProperties} from 'vue';
import SingleScrollNumber from "./SingleScrollNumber";

const MAX_LENGTH = 9;
interface WScrollNumberData {
  timers: Array<number>,
  computeNumber: Array<string>,
  indexArr: Array<number>,
  styleArr: Array<CSSProperties>
}

export default defineComponent({
  name: 'WScrollNumber',
  props: {
    number: {type: Number, default: 0},
    left: {type: Boolean, default: false},
    type: {type: String, default: 'random'},
    speed: {type: Number, default: 200},
    duration: {type: Number, default: 1000},
  },
  components: {SingleScrollNumber},
  setup(props) {
    provide('speed', props.speed);
    provide('duration', props.duration);
  },
  data(): WScrollNumberData {
    return {
      timers: [],
      computeNumber: [],
      indexArr: [],
      styleArr: []
    }
  },
  watch: {
    number() {
      this.refresh();
    },
  },
  methods: {
    /**
     * @description: 数字补零操作，返回数组
     * @param {number} num 被操作数
     * @param {number} n 总长度
     * @return:
     */
    prefixZero(num: number, n: number) {
      return (Array(n).join('') + num).slice(-n).split('');
    },
    // 设置每一位数字的偏移
    setNumberTransform() {
      for (let index = 0; index < this.computeNumber.length; index++) {
        const timer = setInterval(() => {
          const trans = {
            transform: `translate(-50%,-${this.indexArr[index] * 10}%)`
          };
          this.styleArr[index] = trans;
          this.indexArr[index] = this.indexArr[index] === 9 ? 0 : 9;
        }, this.speed);
        this.timers.push(timer);
      }
    },
    setTimeOutClear() {
      for (let index = this.timers.length - 1; index >= 0; index--) {
        setTimeout(() => {
          clearInterval(this.timers[index]);
          const trans = {
            transform: `translate(-50%,-${this.computeNumber[index] * 10}%)`
          };
          this.styleArr[index] = trans;
        }, (!this.left ? (this.timers.length - index) : (index + 1)) * this.duration);
      }
    },
    // 定时刷新数据
    refresh() {
      this.computeNumber = this.prefixZero(this.number, MAX_LENGTH);
      this.styleArr = new Array(this.computeNumber.length);
      this.indexArr = new Array(this.computeNumber.length).fill(9);
      if (this.type !== 'together') {
        this.setNumberTransform();
        // 清除定时器，将数字重置为正确显示
        this.setTimeOutClear()
      }
    },
    getScrollStyle(index: number) {
      return this.styleArr[index];
    }
  },
  mounted() {
    this.refresh();
  },
  render() {
    if (this.type === 'together') {
      return (
        <div class="w-scroll-number">
          {
            String(this.number)
              .split("")
              .map((item, i) => <SingleScrollNumber number={Number(item)}/>)
          }
        </div>
      )
    }


    const {computeNumber} = this;
    const {getScrollStyle} = this;
    return (
      <div class="w-scroll-number">
        {
          computeNumber.map((item, index) =>
            <span class="box-item" key={index}>
              <span style={getScrollStyle(index)}>0123456789</span>
            </span>)
        }
      </div>
    )
  }
})
