/**
 * @description vue version dialog
 * @author 阿怪
 * @date 2023/04/10 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import useModel from '../../../../lib/compositions/useModel';
import { props } from './api.ts';
import './dialog.css';

export default defineComponent((props, { emit, slots, attrs }) => {
  const classList = attrs.class;


  const {
    visible,
    getModel,
    getModelActive,
    handleModelClickPropagation,
    getClose
  } = useModel(props, { emit });
  return () => {

    const getActive = () => {
      return getModelActive(slots.active?.());
    };


    const getDialog = () => {
      return getModel(<div class={['m-dialog', classList]} onClick={handleModelClickPropagation}>
        {props.closeBtn ? getClose() : null}
        {slots.default?.()}
      </div>);
    };

    return <div class="m-dialog-wrapper">
      {getActive()}
      {visible.value ? getDialog() : ''}
    </div>;
  };
}, {
  name: 'MDialog',
  props,
  emits: ['update:visible']
});
