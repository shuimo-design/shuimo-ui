/**
 * @description vue version avatar
 * @author 阿怪
 * @date 2023/05/08 22:52
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { props } from './api.ts';

export default defineComponent((props) => {
  return () => {
    return <div class={['m-avatar', `m-avatar-${props.variant}`, `m-avatar-${props.size}`]}>
      <img src={props.img} alt=""/>
      <div class="m-avatar-mask"></div>
    </div>;
  };
}, {
  name: 'MAvatar',
  props
});
