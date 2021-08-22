/**
 * @Description: 分割线
 * @Author: 菩萨蛮
 * @Date: 2021/2/23 3:57 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { h, defineComponent } from 'vue';
// todo fix ts error
import normalImg from '../../assets/divider/divider.png';
import strongImg from '../../assets/divider/divider_strong.png';

export default defineComponent({
  name: 'WDivider',
  props: {
    type: { type: String, default: '' }
  },
  render() {
    const { type } = this;
    const src = type === '' ? normalImg : strongImg;
    return (
      <img class={['w-divider', type]} src={src} alt="divider"/>
    )
  }

})
