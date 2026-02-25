/**
 * @description 模态框公共 composable（dialog / drawer / confirm 共用）
 * @author 阿怪
 * @date 2026/2/25 16:00
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 处理 visible 状态、遮罩层点击关闭、emit 同步
 */
import { ref, watch } from 'vue';
import { ModelMask } from '../../types/common/model';

export interface UseModalProps {
  visible?: boolean;
  mask?: ModelMask;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useModal(props: UseModalProps, emit: (...args: any[]) => void) {
  const visible = ref(props.visible ?? false);

  watch(() => props.visible, (val) => {
    visible.value = val ?? false;
  });

  /** 打开 */
  const open = () => {
    visible.value = true;
    emit('update:visible', true);
  };

  /** 关闭 */
  const close = () => {
    visible.value = false;
    emit('update:visible', false);
  };

  /** 切换 */
  const toggle = () => {
    if (visible.value) { close(); } else { open(); }
  };

  /** 遮罩层点击 */
  const onMaskClick = () => {
    const mask = props.mask;
    const clickClose = mask?.clickClose ?? true;
    if (clickClose) {
      close();
    }
  };

  /** 是否显示遮罩 */
  const showMask = () => {
    return props.mask?.show ?? true;
  };

  /** 阻止内容区域点击冒泡到遮罩 */
  const onContentClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return {
    visible,
    open,
    close,
    toggle,
    onMaskClick,
    showMask,
    onContentClick,
  };
}
