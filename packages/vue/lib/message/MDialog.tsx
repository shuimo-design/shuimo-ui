/**
 * @description vue version dialog
 * @author 阿怪
 * @date 2023/04/10 11:59
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import { props } from '@shuimo-design/core/lib/message/dialog/api';
import useModel from '../../composition/useModel';

export default defineComponent({
  name: 'MDialog',
  props,
  emits: ['update:visible'],
  setup: (props, { emit, slots }) => {

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
        return getModel(<div class="m-dialog" onClick={handleModelClickPropagation}>
          {props.closeBtn ? getClose() : null}
          {slots.default?.()}
        </div>);
      };

      return <div class="m-dialog-wrapper">
        {getActive()}
        {visible.value ? getDialog() : ''}
      </div>;
    };
  }
});
