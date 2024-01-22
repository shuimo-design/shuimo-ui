/**
 * @description vue version drawer
 * @author 阿怪
 * @date 2023/05/08 00:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent, h } from 'vue';
import useModel from '../../../../lib/compositions/useModel';
import { MBorder } from '../../../../lib';
import { props } from './api.ts';

export default defineComponent((props, { emit, slots }) => {

  const {
    visible,
    getModel,
    getModelActive,
    handleModelClickPropagation
  } = useModel(props, { emit });

  return () => {

    const getActive = () => {
      return getModelActive(slots.active?.());
    };

    const getDrawer = () => {
      return getModel(<div class="m-drawer" onClick={handleModelClickPropagation}>
        {/*{props.closeBtn ? getClose() : null}*/}
        {h(MBorder, {}, () => slots.default?.())}
      </div>);
    };

    return <div class="m-drawer-wrapper">
      {getActive()}
      {visible.value ? getDrawer() : ''}
    </div>;
  };
}, {
  name: 'MDrawer',
  props
});
