/**
 * @description model hook,dialog or drawer are special dialog,so we use this hook to handle it
 * @author 阿怪
 * @date 2023/5/8 01:10
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { toRef, VNode, watch } from 'vue';
import useTeleport from './common/useTeleport.ts';
import useMask from './useMask.tsx';
import { ModelMask } from '../types/common/model';
import { MTeleportProps } from '../types/common/common';

type EmitType = any; // todo fix this
export default function useModel(
  props: {
    visible: boolean,
    teleport: MTeleportProps,
    mask?: ModelMask | undefined,
  },
  ctx: { emit: EmitType },
  options?: { maskClass?: string[], },
) {
  const visible = toRef(props.visible);
  const { emit } = ctx;

  watch(() => props.visible, val => {
    visible.value = val;
  });

  const handleClick = () => {
    visible.value = !visible.value;
    emit('update:visible', visible.value);
  };
  const closeModel = (e: MouseEvent) => {
    visible.value = false;
    emit('update:visible', visible.value);
    e.stopPropagation();
  };
  const { wrapperWithMask } = useMask({
    ...props,
    maskClass: options?.maskClass ?? [],
  }, handleClick);

  const getClose = () => {
    return <div onClick={(e: MouseEvent) => closeModel(e)} class="m-model-close-btn m-cursor-pointer"/>;
  };

  const getModelActive = (dom?: VNode | VNode[]) => {
    return <div class="m-model-active" onClick={handleClick}>
      {dom}
    </div>;
  };

  const handleModelClickPropagation = (e: MouseEvent) => {e.stopPropagation();};


  const getModel = (dom: VNode) => {
    return useTeleport({
      teleportProps: { to: props.teleport.to },
      slot: wrapperWithMask(dom),
    });
  };

  return {
    visible,
    handleClick,
    getModel,
    closeModel,
    handleModelClickPropagation,
    getClose,
    getModelActive,
  };

}
