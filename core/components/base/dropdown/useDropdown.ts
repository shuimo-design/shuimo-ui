/**
 * @description dropdown composable
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { DropdownItemProps, DropdownProps } from './props';
import useClickAway from '../../../compositions/popper/useClickAway';

export default function useDropdown(props: Required<DropdownProps>, ctx: any) {
  const { emit } = ctx;

  // 下拉菜单是否展开
  const visible = ref(false);

  // 触发器 DOM 引用，用于 clickAway 检测
  const triggerRef = ref<HTMLElement>();
  const menuRef = ref<HTMLElement>();

  /** 打开下拉菜单 */
  const open = () => {
    if (props.disabled) { return; }
    visible.value = true;
  };

  /** 关闭下拉菜单 */
  const close = () => {
    visible.value = false;
  };

  /** 切换下拉菜单展开/收起 */
  const toggle = () => {
    if (visible.value) {
      close();
    } else {
      open();
    }
  };

  // 点击外部自动关闭
  let clickAwayInstance: ReturnType<typeof useClickAway>;

  onMounted(() => {
    clickAwayInstance = useClickAway({
      // 以 trigger 容器为边界，点击 trigger 或 menu 内部不触发关闭
      target: () => triggerRef.value?.parentElement,
      handler: () => {
        close();
      },
    });
    clickAwayInstance?.add();
  });

  onBeforeUnmount(() => {
    clickAwayInstance?.remove();
  });

  // ---- 触发器事件处理 ----

  /** click 触发模式下点击处理 */
  const handleTriggerClick = () => {
    if (props.trigger !== 'click') { return; }
    toggle();
  };

  /** hover 触发模式下鼠标进入处理 */
  const handleMouseenter = () => {
    if (props.trigger !== 'hover') { return; }
    open();
  };

  /** hover 触发模式下鼠标离开处理 */
  const handleMouseleave = () => {
    if (props.trigger !== 'hover') { return; }
    close();
  };

  // ---- 选项点击处理 ----

  /**
   * 选项被点击时：触发 command 事件并关闭菜单
   */
  const handleItemClick = (item: DropdownItemProps) => {
    if (item.disabled) { return; }
    emit('command', item.command);
    close();
  };

  // ---- class 计算 ----

  const dropdownClass = computed(() => [
    'm-dropdown',
    { 'm-dropdown-open': visible.value },
    { 'm-dropdown-disabled': props.disabled },
  ]);

  const menuClass = computed(() => ['m-dropdown-menu']);

  const getItemClass = (item: DropdownItemProps) => [
    'm-dropdown-item',
    { 'm-dropdown-item-disabled': item.disabled },
    { 'm-dropdown-item-divided': item.divided },
  ];

  return {
    visible,
    triggerRef,
    menuRef,
    open,
    close,
    toggle,
    handleTriggerClick,
    handleMouseenter,
    handleMouseleave,
    handleItemClick,
    dropdownClass,
    menuClass,
    getItemClass,
  };
}
