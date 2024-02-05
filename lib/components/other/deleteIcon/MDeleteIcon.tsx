/**
 * @description vue version deleteIcon
 * @author 阿怪
 * @date 2023/05/18 15:21
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import './deleteIcon.css';

export default defineComponent((_, { emit }) => {
  const click = (e: MouseEvent) => {
    emit('click', e);
  };
  return () => {
    return <div onClick={click} class="m-delete-icon"/>;
  };
}, {
  name: 'MDeleteIcon',
  emits: ['click']
});
