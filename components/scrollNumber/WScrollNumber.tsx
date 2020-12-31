/**
 * @description 数组滚动组件
 * @author: 南歌子
 * @date 2020/12/23 20:49
 * @version V1.0.0
 *
 */

import {defineComponent, Teleport} from 'vue';

export default defineComponent({
  name: 'WScrollNumber',
  props: {
    number: {
      type: Number,
      default: 0
    },
    left: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      maxLen: 9, //最大长度
      computeNumber: [], //数字补零后分割为数组，遍历
      timeTicket: null,
      timers: [],
      indexArr: []
    };
  },
  watch: {
    number () {
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

    prefixZero (num, n) {
      return (Array(n).join('') + num).slice(-n).split('');
    },
    /**
     * @description: 获取随机数
     * @param {type}
     * @return:
     */
    getRandomNumber (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 设置每一位数字的偏移
    setNumberTransform() {
      for (let index = 0; index < this.computeNumber.length; index++) {
        const timer = setInterval(() => {
          const elem = this.$refs[`numberDom${index}`];
          if (elem) {
            elem.style.transform = `translate(-50%,-${this.indexArr[index] * 10}%)`;
            if (this.indexArr[index] === 9) {
              this.indexArr[index] = 0;
            } else {
              this.indexArr[index] = 9;
            }
          }
        }, 200);
        this.timers.push(timer);
      }
    },
    setTimeOutClear() {
      for(let index = this.timers.length - 1; index >= 0; index--) {
        setTimeout(() => {
          clearInterval(this.timers[index]);
          const elem = this.$refs[`numberDom${index}`];
          if (elem) {
            elem.style.transform = `translate(-50%,-${this.computeNumber[index] * 10}%)`;
          }
        }, (!this.left ? (this.timers.length - index) : (index + 1)) * 1000);
      }
    },
    // 定时刷新数据
    refresh () {
      const _this = this;
      _this.computeNumber = _this.prefixZero(_this.number, _this.maxLen);
      _this.indexArr = new Array(_this.computeNumber.length).fill(9);
      this.setNumberTransform();
      // 清除定时器，将数字重置为正确显示
      this.setTimeOutClear()
    }
  },
  mounted () {
    this.refresh();
  },
  unmounted () {
    window.clearTimeout(this.timeTicket);
    this.timeTicket = null;
  },
  render() {
    const {computeNumber} = this;
    return (
        <div class="w-scroll-number">
          {
            computeNumber.map((item, index) => <span class="box-item" key={index}>
              <span ref={`numberDom${index}`}>0123456789</span>
            </span>)
          }
        </div>
    )
  }
})
