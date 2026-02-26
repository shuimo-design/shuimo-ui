/**
 * @description collapse composable
 * @author 阿怪
 * @date 2026/2/26
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { computed } from 'vue';
import { CollapseProps } from './props';

export default function useCollapse(props: Required<CollapseProps>, ctx: any) {
  const { emit } = ctx;

  /**
   * 将 modelValue 规范化为数组，统一内部处理
   */
  const activeNames = computed<(string | number)[]>(() => {
    const val = props.modelValue;
    if (Array.isArray(val)) { return val; }
    if (val === undefined || val === null || val === '') { return []; }
    return [val];
  });

  /**
   * 判断指定面板是否处于展开状态
   */
  const isActive = (name: string | number): boolean => {
    return activeNames.value.includes(name);
  };

  /**
   * 切换面板展开/收起
   * - 手风琴模式：同时只允许一个展开
   * - 普通模式：在数组中添加/移除
   */
  const toggle = (name: string | number, disabled: boolean) => {
    if (disabled) { return; }

    let next: (string | number)[];

    if (props.accordion) {
      // 手风琴：已展开则收起，否则切换为仅展开当前
      next = isActive(name) ? [] : [name];
    } else {
      if (isActive(name)) {
        next = activeNames.value.filter(n => n !== name);
      } else {
        next = [...activeNames.value, name];
      }
    }

    // 向父组件同步值
    emit('update:modelValue', props.accordion ? (next[0] ?? '') : next);
    emit('change', next);
  };

  // ---- class 计算 ----

  const collapseClass = computed(() => ['m-collapse']);

  const getItemClass = (name: string | number, disabled: boolean) => [
    'm-collapse-item',
    { 'm-collapse-item-active': isActive(name) },
    { 'm-collapse-item-disabled': disabled },
  ];

  const headerClass = ['m-collapse-header'];
  const contentClass = ['m-collapse-content'];

  return {
    activeNames,
    isActive,
    toggle,
    collapseClass,
    getItemClass,
    headerClass,
    contentClass,
  };
}
