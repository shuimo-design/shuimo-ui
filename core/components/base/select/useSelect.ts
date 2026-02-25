/**
 * @description select 核心 composable
 * @author 阿怪
 * @date 2026/2/25 14:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 用 computed + ref 替代原 class 继承方案
 * 单选/多选通过 props.multiple 分支处理
 * fetch 通过 IntersectionObserver 观察最后一个选项实现
 */
import { computed, ref, watch, toRef, Ref, onBeforeUnmount } from 'vue';
import { SelectProps } from './props';
import { useSelectTools } from './useSelectTools';

export interface SelectOptionItem {
  /** 原始值 */
  value: any;
  /** 在 options 数组中的索引 */
  index: number;
  /** 是否选中 */
  isSelected: boolean;
}

export function useSelect(props: SelectProps, ctx: any) {
  const tools = useSelectTools(props);
  const optionsRef = toRef(() => props.options ?? []);
  const modelValueRef = toRef(() => props.modelValue);
  const multipleRef = toRef(() => props.multiple ?? false);

  // --- 状态 ---
  const inputValue = ref('');
  const isOpen = ref(false);
  const fetchLoading = ref(false);

  // --- 选中状态 ---
  /** 多选时记录选中的索引集合 */
  const selectedIndices = ref<Set<number>>(new Set());

  /** 判断某个 option 是否选中 */
  const isSelected = (option: any, index: number): boolean => {
    if (multipleRef.value) {
      return selectedIndices.value.has(index);
    }
    if (props.toMatch) {
      return props.toMatch(option, modelValueRef.value);
    }
    return modelValueRef.value === tools.getModelValue(option);
  };

  // --- 选项列表 ---
  /** 全量选项（带 isSelected 标记） */
  const allOptions = computed<SelectOptionItem[]>(() => {
    return optionsRef.value.map((o, i) => ({
      value: o,
      index: i,
      isSelected: isSelected(o, i),
    }));
  });

  /** 过滤后的显示选项 */
  const displayOptions = computed<SelectOptionItem[]>(() => {
    return allOptions.value.filter(o => {
      if (props.readonly) return true;
      if (!inputValue.value) return true;
      if (props.filter) {
        return props.filter(o.value, inputValue.value);
      }
      // 默认：输入值匹配 inputParam 字段
      return tools.getInputValue(o.value).includes(inputValue.value);
    });
  });

  /** 多选已选标签 */
  const selectedTags = computed<SelectOptionItem[]>(() => {
    if (!multipleRef.value) return [];
    return allOptions.value.filter(o => o.isSelected);
  });

  // --- 初始化 inputValue ---
  const syncInputFromModelValue = () => {
    if (multipleRef.value) {
      inputValue.value = '';
      return;
    }
    const mv = modelValueRef.value;
    if (mv == null || mv === '') {
      inputValue.value = '';
      return;
    }
    const found = optionsRef.value.find(o => {
      if (props.toMatch) return props.toMatch(o, mv);
      return tools.getModelValue(o) === mv;
    });
    inputValue.value = found ? tools.getInputValue(found) : '';
  };

  /** 初始化多选选中状态 */
  const syncSelectedFromModelValue = () => {
    if (!multipleRef.value) return;
    const mv = modelValueRef.value;
    const newSet = new Set<number>();
    if (Array.isArray(mv)) {
      optionsRef.value.forEach((o, i) => {
        const val = tools.getModelValue(o);
        if (mv.includes(val)) {
          newSet.add(i);
        }
        if (props.toMatch && mv.some((v: any) => props.toMatch!(o, v))) {
          newSet.add(i);
        }
      });
    }
    selectedIndices.value = newSet;
  };

  // 初始同步
  syncSelectedFromModelValue();
  syncInputFromModelValue();

  // --- 事件处理 ---

  /** 点击选项 */
  const onSelect = (index: number) => {
    const option = optionsRef.value[index];
    if (!option) return;

    if (multipleRef.value) {
      // 多选：切换选中
      const newSet = new Set(selectedIndices.value);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      selectedIndices.value = newSet;
      inputValue.value = '';

      const newModelValue = optionsRef.value
        .filter((_, i) => newSet.has(i))
        .map(o => tools.getModelValue(o));
      ctx.emit('update:modelValue', newModelValue);
      ctx.emit('select', option);
    } else {
      // 单选：选中并关闭
      inputValue.value = tools.getInputValue(option);
      ctx.emit('update:modelValue', tools.getModelValue(option));
      ctx.emit('select', option);
      isOpen.value = false;
    }
  };

  /** 删除多选标签 */
  const onDeleteTag = (index: number) => {
    const newSet = new Set(selectedIndices.value);
    newSet.delete(index);
    selectedIndices.value = newSet;

    const newModelValue = optionsRef.value
      .filter((_, i) => newSet.has(i))
      .map(o => tools.getModelValue(o));
    ctx.emit('update:modelValue', newModelValue);
  };

  /** 输入事件 */
  const onInput = () => {
    ctx.emit('input', inputValue.value);
  };

  /** 聚焦 */
  const onFocus = (e: FocusEvent) => {
    if (props.readonly) return;
    ctx.emit('focus', e, inputValue.value);
  };

  /** 失焦 */
  const onBlur = (e: FocusEvent) => {
    if (props.readonly) return;
    ctx.emit('blur', e, inputValue.value);

    // 单选失焦时，如果输入值不匹配任何选项，清空
    if (!multipleRef.value) {
      const matched = displayOptions.value.find(o => o.isSelected);
      if (matched && inputValue.value === tools.getInputValue(matched.value)) return;
      if (!inputValue.value) {
        ctx.emit('update:modelValue', undefined);
      }
    }
  };

  // --- Fetch（IntersectionObserver 观察最后一个选项） ---
  const lastOptionRef = ref<HTMLElement | null>(null);
  const optionsContainerRef = ref<HTMLElement | null>(null);
  let fetchObserver: IntersectionObserver | undefined;

  const cleanupFetchObserver = () => {
    if (fetchObserver) {
      fetchObserver.disconnect();
      fetchObserver = undefined;
    }
  };

  /** 更新 fetch observer：观察最后一个选项元素 */
  const updateFetchObserver = () => {
    cleanupFetchObserver();
    if (!props.needFetch || !lastOptionRef.value || !optionsContainerRef.value) return;

    fetchObserver = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting && props.needFetch) {
          fetchLoading.value = true;
          await props.fetch?.();
          fetchLoading.value = false;
        }
      },
      { root: optionsContainerRef.value, threshold: 1 },
    );
    fetchObserver.observe(lastOptionRef.value);
  };

  // --- Watch ---

  // modelValue 变化时同步输入框和选中状态
  watch(modelValueRef, () => {
    syncSelectedFromModelValue();
    syncInputFromModelValue();
  });

  // options 变化时重新同步
  watch(optionsRef, () => {
    syncSelectedFromModelValue();
    syncInputFromModelValue();
  }, { deep: true });

  // lastOptionRef 变化时更新 fetch observer
  watch(lastOptionRef, () => {
    updateFetchObserver();
  });

  onBeforeUnmount(cleanupFetchObserver);

  return {
    // 状态
    inputValue,
    isOpen,
    fetchLoading,
    // 列表
    displayOptions,
    selectedTags,
    // DOM refs（fetch 用）
    lastOptionRef,
    optionsContainerRef,
    // 事件
    onSelect,
    onDeleteTag,
    onInput,
    onFocus,
    onBlur,
    // 工具
    tools,
    // fetch
    updateFetchObserver,
  };
}
