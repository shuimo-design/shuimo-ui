/**
 * @Description: 水墨进度条
 * @Author: 菩萨蛮
 * @Date: 2021/2/25 2:40 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { h, defineComponent } from 'vue';

import grayLine from '../assets/process/gray_line.png';
import blackLine from '../assets/process/black_line.png';

const prependDefault = {
  position: 'left',
  text: ''
}

export default defineComponent({
  name: 'WProcess',
  props: {
    height: { type: Number, default: 19 },
    width: { type: Number, default: 449 },
    per: { type: Number, default: 0 },
    prepend: {
      type: Object,
      default: () => prependDefault
    },
    text: { type: String, default: '' }
  },
  render() {
    const { height, width } = this;

    const processStyle = {
      height: `${height}px`,
      width: `${width}px`
    }
    const maskStyle = {
      height: `${height}px`,
      width: `${width * this.per}px`,
      top: `-${height + 5}px`
    }
    const textStyle = {
      height: `${height}px`,
      'line-height': `${height}px`,
      'padding-left': `${width * 0.02}px`,
      width: `${width * 0.98}px`,
      top: `-${height * 2 + 10}px`
    }


    return (
      <div class="w-process" style={processStyle}>
        <img style={processStyle} src={grayLine} alt=""/>
        <div class="process-mask" style={maskStyle}>
          <img style={processStyle} src={blackLine} alt=""/>
        </div>
        <div class="process-text" style={textStyle}>
          <span class="process-prepend-left">{this.prepend.position !== 'right' ? this.prepend.text : ''}</span>
          <span class="process-main">{this.text}</span>
          <span class="process-prepend-right">{this.prepend.position === 'right' ? this.prepend.text : ''}</span>
        </div>
      </div>
    )
  }
})
