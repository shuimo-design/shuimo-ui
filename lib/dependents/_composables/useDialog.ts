/**
 * @description 弹窗、抽屉相关模块管理
 * @author 阿怪
 * @date 2021/8/24 2:44 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { computed, ref, useSlots } from 'vue';
import { CLOSE_EVENT, CONFIRM_EVENT } from '../_utils/constants';
import { notEmpty } from '../_utils/tools';

export default function useDialog(props: any, context: { emit: (event: 'close' | 'confirm', ...args: any[]) => void }) {
  const pes = ref(1);

  const emit = context.emit;

  const maskClass = computed(() => ['mask', props.mask.show ? 'mask-bg' : '']);

  const closeDialog = (e: MouseEvent) => {
    emit(CLOSE_EVENT, e);
  };

  const confirmDialog = () => {
    emit(CONFIRM_EVENT);
  };

  const maskClick = (e: MouseEvent) => {
    if (!props.mask.clickClose) {
      return;
    }
    const pathList = e.composedPath();
    if (notEmpty(pathList)) {
      const dom = pathList[0] as Element;
      if (dom && dom.classList.contains('mask')) {
        closeDialog(e);
      }
    }
  };

  const getDomHW = (dom: Element) => {
    const getNumber = (type: string) => Number(getComputedStyle(dom, null).getPropertyValue(type).replace('px', ''));
    const h = getNumber('height');
    const w = getNumber('width');
    return { h, w };
  };

  const slots = useSlots();
  const resetSize = (baseH: number, baseW: number) => {
    const slotDom = slots.default!();
    if (slotDom && slotDom[0]) {
      const slotDomDefault = slotDom[0];
      let dom = slotDomDefault.el as Element;
      if (!dom && slotDomDefault.props) {
        const className = slotDomDefault.props.class;
        const domList = document.getElementsByClassName(className);
        if (domList && domList.length === 1) {
          dom = domList[0];
        }
      }
      if (dom) {
        const { h, w } = getDomHW(dom);
        // 为了修复不知道为什么第二次打开getComputedStyle没值的问题
        if (h !== 0 || w !== 0) {
          pes.value = Math.max(h / baseH, w / baseW, 1);
        }
      }
    }
  };

  return {
    pes,
    maskClass,
    maskClick,
    closeDialog,
    confirmDialog,
    resetSize
  };
}
