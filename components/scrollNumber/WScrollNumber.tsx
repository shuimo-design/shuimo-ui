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
      default: 0,
    }
  },
  data() {
    return {
      maxLen: 9, //最大长度
      computeNumber: [], //数字补零后分割为数组，遍历
      timeTicket: null,
      Index: 0
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
    setNumberTransform () {
      for(let index = 0; index < this.computeNumber.length; index++) {
        const elem = this.$refs[`numberDom${index}`];
        elem.style.transform = `translate(-50%,-${Number(this.Index < this.computeNumber[index] ? this.Index : this.computeNumber[index]) * 10}%)`;
      }
      this.Index++;
    },
    // 定时增长数字
    increaseNumber () {
      this.refresh();
      this.timeTicket = setTimeout(this.increaseNumber, 100);
    },
    // 定时刷新数据
    refresh () {
      this.computeNumber = this.prefixZero(this.number, this.maxLen);
      this.$nextTick(() => this.setNumberTransform());
    }
  },
  mounted () {
    this.increaseNumber();
  },
  unmounted () {
    window.clearTimeout(this.timeTicket);
    this.timeTicket = null;
    this.Index = 0;
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
