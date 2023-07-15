/**
 * @description 选择框组件
 * @author 阿怪
 * @date 2021/8/27 11:05 上午
 * @version v2.1.2
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1.0.1 修复moduleValue不更新问题、keyParam默认值改为title 阿怪
 * v1.0.2 keyParam默认值改为value，新增titleParam
 * v1.0.3 修复之前两个版本错误的参数流转问题
 * v1.1.0 代码结构改为使用ts，新增输入框筛选功能
 * v1.1.1 添加slot功能
 * v1.1.2 输入模式添加点击查询功能
 * v2.0.0 重构
 * v2.0.1 添加focus冒泡、dialog添加防抖和仅在option大于0的时候显示判断
 * v2.0.2 修复inputValue在找不到时不更新数据的问题
 * v2.1.0 hook化并添加multiple属性 Jimmy
 * v2.1.1 修复readonly场景下的筛选问题，修复重复数据问题
 *        优化部分UI，
 *        添加数组为空支持，
 *        inputReadonly改为readonly
 *        multiple支持undefined modelValue 阿怪
 * v2.1.2 support props options update 阿怪  todo -> what will happen if another props changes?
 */
import { computed, defineComponent, h, ref, watch } from 'vue';
import { props } from '@shuimo-design/core/lib/base/select/api';
import MInput from './MInput';
import useBorder from '../../composition/useBorder';
import { OptionType, useSelect } from '@shuimo-design/core/lib/base/select/useSelect';
import useSelectTools from '@shuimo-design/core/lib/base/select/composition/useSelectTools';
import { isEmpty } from '@shuimo-design/tools/empty';
import MTag from './MTag';
import selectCreator from '@shuimo-design/core/lib/base/select/composition/selectCreator';
import { SelectOptions } from '@shuimo-design/core/lib/base/select/composition/class/BaseSelect';
import MDeleteIcon from '../other/MDeleteIcon';
import usePopover from '../../composition/usePopover';

const MOption = defineComponent({
  name: 'MOption',
  props: {
    isSelected: Boolean
  },
  setup(props, { slots }) {
    return () => {
      return <div class={['m-option', { 'm-option-selected': props.isSelected }]}>{slots.default?.() ?? ''}</div>;
    };
  }
});

const MSelectTag = defineComponent({
  name: 'MSelectTag',
  emits: ['delete'],
  setup(props, { slots, emit }) {
    const deleteTag = (e: MouseEvent) => {
      e.stopPropagation();
      emit('delete');
    };
    return () => {
      return <MTag>
        <span>{slots.default?.()}</span>
        <MDeleteIcon onClick={deleteTag} class="m-select-tag-delete-icon m-cursor-pointer"/>
      </MTag>;
    };
  }
});


export default defineComponent({
  name: 'MSelect',
  props,
  emits: ['update:modelValue', 'input', 'select', 'focus', 'blur'],
  setup(props, { emit, slots }) {
    const selectOptions = ref([]);
    const selectDisplayOptions = ref([]);
    const selectTags = ref([]);
    const inputValue = ref('');


    const tools = useSelectTools(props);
    const {
      popoverOptions,
      inputProps,
      getOptions
    } = useSelect({ props, value: { inputValue } });

    const { popoverRef, withPopover } = usePopover(popoverOptions, 'm-select');

    // ---------- new ----------

    const getEmpty = () => <div class="m-select-empty">
      {slots && slots.empty ? slots.empty() : <span class="m-select-empty-span">暂无数据</span>}
    </div>;


    const optionClick = (o: SelectOptions<OptionType>) => {
      const { modelValue } = select.onClickOption(o.index);
      emit('update:modelValue', modelValue);
      emit('select', o.value);
      popoverRef.value.hide();
    };

    const getRenderOptions = computed(() => getOptions());
    const updateInput = () => {
      select.onInput();
      emit('input', inputValue.value);
    };

    const onFocus = (value: FocusEvent) => {
      if (props.readonly) return;
      emit('focus', value, inputValue.value);
    };

    const onBlur = (value: FocusEvent) => {
      if (props.readonly) return;
      emit('blur', value, inputValue.value);

      const selected = getRenderOptions.value.find(o => o.isSelected);
      if (selected && inputValue.value === tools.getInputValue(selected)) return;

      if (isEmpty(inputValue.value)) {
        emit('update:modelValue', undefined);
      }


      // todo
    };

    const select = selectCreator({
      props,
      value: { inputValue, selectOptions, selectDisplayOptions, selectTags }
    });

    const deleteTag = (tag: SelectOptions<OptionType>) => {
      select.onDeleteTag(tag);
      emit('update:modelValue', select.getModelValue());
    };


    watch(() => props.modelValue, (value) => {
      select.setInputValue(value);
    });

    watch(() => props.options, () => {
      select.optionsUpdate();
    });

    return () => {
      const { withBorder } = useBorder();
      const getOptionDisplayInfo = (o: OptionType) => {
        if (slots.option) {
          return slots.option({ option: o });
        }
        return String(tools.getOptionValue(o));
      };


      const render = select.initRender({
        single: {
          active: () => {
            return <MInput class="m-select-input" v-model={inputValue.value}
                           onFocus={onFocus} onBlur={onBlur}
                           onInput={updateInput} {...inputProps}/>;
          },
          content: data => {
            const { options } = data();
            return withBorder(<div class="m-select-options">
              {
                options.length > 0 ? options.map(o =>
                    h(MOption, {
                      onClick: () => optionClick(o),
                      isSelected: o.isSelected
                    }, () => getOptionDisplayInfo(o.value))) :
                  getEmpty()
              }
            </div>);
          }
        },
        multiple: {
          active: getData => {
            const getSelectedTag = (tags: OptionType[]) => {

              if (!tags || tags.length === 0) return null;
              return tags.map(tag => <MSelectTag onDelete={() => deleteTag(tag)}>
                {getOptionDisplayInfo(tag.value)}
              </MSelectTag>);
            };

            const { tags } = getData();

            return withBorder(<div class="m-select-multiple-inner">
              {getSelectedTag(tags)}
              {inputProps.readonly ?
                <span class="m-select-multiple-placeholder">{props.placeholder}</span>
                : <input class="m-select-multiple-input" type="text"
                         onFocus={onFocus} onBlur={onBlur}
                         onInput={updateInput}
                         v-model={inputValue.value}
                         {...inputProps}/>}
            </div>, 'm-select-multiple');
          },
          content: data => {
            const { options } = data();
            return withBorder(<div class="m-select-options">
              {
                options.length > 0 ? options.map(o =>
                    h(MOption, {
                      onClick: () => optionClick(o),
                      isSelected: o.isSelected
                    }, () => getOptionDisplayInfo(o.value))) :
                  getEmpty()
              }
            </div>);
          }
        }
      });

      return withPopover({
        default: render.getActive,
        content: render.getContent
      });
    };

  }
});
