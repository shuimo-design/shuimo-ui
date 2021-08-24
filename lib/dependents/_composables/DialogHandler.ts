/**
 * @Description: 弹窗、抽屉相关模块管理
 * @Author: 菩萨蛮
 * @Date: 2021/8/24 2:44 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { computed, useSlots, ref } from 'vue';
import { CLOSE_EVENT, CONFIRM_EVENT } from "../_utils/constants";
import { notEmpty } from "../_utils/tools";

export default function DialogHandler(props: any, context: any) {

  const pes = ref(1);

  const emit = context.emit;

  const maskClass = computed(() => ['mask', props.mask.show ? 'mask-bg' : '']);

  const closeDialog = () => {emit(CLOSE_EVENT);}

  const confirmDialog = () => {emit(CONFIRM_EVENT);}

  const maskClick = (e: MouseEvent) => {
    const pathList = e.composedPath();
    if (notEmpty(pathList)) {
      const dom = pathList[0] as Element;
      if (dom && dom.classList.contains('mask')) {
        closeDialog();
      }
    }
  }

  const getDomHW = (dom: Element) => {
    const getNumber = (type: string) => Number(getComputedStyle(dom, null).getPropertyValue(type).replace('px', ''));
    const h = getNumber('height');
    const w = getNumber('width');
    return { h, w };
  }

  const slots = useSlots();
  const resetSize = (baseH: number, baseW: number) => {
    const slotDom = slots.default!();
    if (slotDom && slotDom[0]) {
      const slotDomDefault = slotDom[0];
      let dom = slotDomDefault.el as Element;
      if (!dom) {
        const className = slotDomDefault.props!.class;
        const domList = document.getElementsByClassName(className)
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
  }

  return {
    pes,
    maskClass,
    maskClick,
    closeDialog,
    confirmDialog,
    resetSize
  }
}
