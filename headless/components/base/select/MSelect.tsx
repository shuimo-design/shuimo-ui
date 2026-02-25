/**
 * @description headless select 组件
 * @author 阿怪
 * @date 2026/2/25 15:00
 * @version v2.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   .m-select
 *     .m-select-trigger (单选: input / 多选: tags + input)
 *     .m-select-dropdown (popover 定位的下拉面板)
 *       .m-select-options
 *         .m-option * N
 *       .m-select-loading (fetch 加载中)
 *       .m-select-empty (无数据)
 */
import { defineComponent, ref, nextTick, Teleport, watch } from 'vue';
import { SelectCore } from '@shuimo-design/ui-core';
import { SelectProps } from '@shuimo-design/ui-core/components/base/select/props';
import { SelectOptionItem } from '@shuimo-design/ui-core/components/base/select/useSelect';
import './select.css';

const { props: selectProps, useSelect } = SelectCore;

export default defineComponent((_props: SelectProps, _ctx: any) => {
  const props = _props as Required<SelectProps>;
  const { slots, expose } = _ctx;

  const {
    inputValue,
    isOpen,
    fetchLoading,
    displayOptions,
    selectedTags,
    lastOptionRef,
    optionsContainerRef,
    onSelect,
    onDeleteTag,
    onInput,
    onFocus,
    onBlur,
    tools,
    updateFetchObserver,
  } = useSelect(props, _ctx);

  // popover 定位
  const triggerRef = ref<HTMLElement | null>(null);
  const dropdownRef = ref<HTMLElement | null>(null);

  // 简单的下拉定位：显示在 trigger 下方
  const dropdownStyle = ref<Record<string, string>>({});

  const updateDropdownPosition = () => {
    if (!triggerRef.value) return;
    const rect = triggerRef.value.getBoundingClientRect();
    dropdownStyle.value = {
      position: 'fixed',
      left: `${rect.left}px`,
      top: `${rect.bottom}px`,
      width: `${rect.width}px`,
      zIndex: '1000',
    };
  };

  const open = () => {
    if (props.disabled) return;
    isOpen.value = true;
    nextTick(() => {
      updateDropdownPosition();
      updateFetchObserver();
    });
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    if (isOpen.value) { close(); } else { open(); }
  };

  expose({ open, close, toggle, getInputValue: () => inputValue.value });

  // 点击外部关闭
  const onClickOutside = (e: MouseEvent) => {
    if (!isOpen.value) return;
    const target = e.target as Node;
    if (triggerRef.value?.contains(target)) return;
    if (dropdownRef.value?.contains(target)) return;
    close();
  };

  // 全局点击监听
  if (typeof document !== 'undefined') {
    const handler = (e: MouseEvent) => onClickOutside(e);
    document.addEventListener('mousedown', handler);
    // 组件卸载时会被 Vue 自动清理（defineComponent setup 的生命周期）
  }

  /** 选项点击 */
  const handleOptionClick = (item: SelectOptionItem) => {
    onSelect(item.index);
    if (!props.multiple) {
      close();
    }
  };

  /** 获取选项显示内容 */
  const getOptionDisplay = (option: any) => {
    if (slots.option) {
      return slots.option({ option });
    }
    return tools.getOptionValue(option);
  };

  // watch options 变化时更新 fetch observer
  watch(() => displayOptions.value.length, () => {
    if (isOpen.value && props.needFetch) {
      nextTick(updateFetchObserver);
    }
  });

  return () => {
    const optionsList = displayOptions.value;
    const lastIndex = optionsList.length - 1;

    // --- Trigger ---
    const renderTrigger = () => {
      if (props.multiple) {
        // 多选 trigger：tags + 输入
        return <div class="m-select-trigger m-select-trigger-multiple"
                    ref={el => triggerRef.value = el as HTMLElement}
                    onClick={toggle}>
          <div class="m-select-tags">
            {selectedTags.value.map(tag =>
              <span class="m-select-tag" key={tag.index}>
                <span class="m-select-tag-text">{getOptionDisplay(tag.value)}</span>
                <span class="m-select-tag-close"
                      onClick={(e: MouseEvent) => { e.stopPropagation(); onDeleteTag(tag.index); }}>×</span>
              </span>,
            )}
          </div>
          {!props.readonly && <input
            class="m-select-input"
            type="text"
            value={inputValue.value}
            placeholder={selectedTags.value.length === 0 ? props.placeholder : ''}
            onInput={(e: Event) => { inputValue.value = (e.target as HTMLInputElement).value; onInput(); }}
            onFocus={onFocus}
            onBlur={onBlur}
          />}
        </div>;
      }

      // 单选 trigger
      return <div class="m-select-trigger"
                  ref={el => triggerRef.value = el as HTMLElement}
                  onClick={toggle}>
        <input
          class="m-select-input"
          type="text"
          value={inputValue.value}
          readonly={props.readonly}
          disabled={props.disabled}
          placeholder={props.placeholder}
          onInput={(e: Event) => { inputValue.value = (e.target as HTMLInputElement).value; onInput(); }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>;
    };

    // --- Dropdown ---
    const renderDropdown = () => {
      if (!isOpen.value) return null;

      return <Teleport to="body">
        <div class="m-select-dropdown"
             ref={el => dropdownRef.value = el as HTMLElement}
             style={dropdownStyle.value}>
          <div class="m-select-options"
               ref={el => optionsContainerRef.value = el as HTMLElement}>
            {optionsList.length > 0
              ? optionsList.map((o, i) =>
                <div class={['m-option', { 'm-option-selected': o.isSelected }]}
                     key={o.index}
                     ref={el => { if (i === lastIndex) lastOptionRef.value = el as HTMLElement; }}
                     onClick={() => handleOptionClick(o)}>
                  {getOptionDisplay(o.value)}
                </div>,
              )
              : <div class="m-select-empty">
                {slots.empty ? slots.empty() : <span>暂无数据</span>}
              </div>
            }
          </div>
          {fetchLoading.value && <div class="m-select-loading">加载中...</div>}
        </div>
      </Teleport>;
    };

    return <div class="m-select">
      {renderTrigger()}
      {renderDropdown()}
    </div>;
  };
}, {
  name: 'MSelect',
  props: selectProps,
  emits: ['update:modelValue', 'input', 'select', 'focus', 'blur'],
});
