/**
 * @description 选择框组件
 * @author 阿怪
 * @date 2021/8/27 11:05 上午
 * @version v2.1.3-beta
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * v1     don't care
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
 * v2.1.3-beta support fetch 阿怪
 *
 * todo : maybe should keep options render
 */
import { computed, defineComponent, h, ref, VNode, watch } from 'vue';
import { props } from '@shuimo-design/core/lib/base/select/api';
import MInput from './MInput';
import useBorder from '../../composition/useBorder';
import { OptionType, useSelect } from '@shuimo-design/core/lib/base/select/useSelect';
import useSelectTools from '@shuimo-design/core/lib/base/select/composition/useSelectTools';
import { isEmpty } from '@shuimo-design/tools/empty';
import MTag from './MTag';
import selectCreator from '@shuimo-design/core/lib/base/select/composition/selectCreator';
import { ISelectOptions, SelectOptions } from '@shuimo-design/core/lib/base/select/composition/class/BaseSelect';
import MDeleteIcon from '../other/MDeleteIcon';
import usePopover from '../../composition/usePopover';
import MLoading from '../other/loading/MLoading';

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
      getOptions,
      lastOptionRef, selectOptionRef, fetchLoadingRef,
    } = useSelect({ props, value: { inputValue } }, ref);

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
    }, { deep: true });



    // temp version
    const fixPx = (value: string | number | undefined | null) => {
      if (value == null) {
        return value;
      }
      if (!isNaN(Number(value))) {
        return `${value}px`;
      }
      return value;
    };
    const optionsStyleRef = ref(props.optionsH ? {
      'max-height': fixPx(props.optionsH),
      'overflow': 'auto'
    } : undefined);


    return () => {
      const { withBorder } = useBorder();
      const getOptionDisplayInfo = (o: OptionType) => {
        if (slots.option) {
          return slots.option({ option: o });
        }
        return String(tools.getOptionValue(o));
      };

      const loadingDom = fetchLoadingRef.value ? <div class="m-select-loading">
        <MLoading/>
      </div> : null;

      const initContent: ISelectOptions<OptionType, VNode>['content'] = data => {
        const { options } = data();
        const lastIndex = options.length - 1;
        return withBorder(<div class="m-select-options" style={optionsStyleRef.value}
                               ref={el => selectOptionRef.value = el}>
          <div class="m-select-options-inside">
            {
              options.length > 0 ? options.map((o, i) =>
                  h(MOption, {
                    onClick: () => optionClick(o),
                    isSelected: o.isSelected,
                    ref: el => {
                      if (i === lastIndex) {
                        lastOptionRef.value = el;
                      }
                    }
                  }, () => getOptionDisplayInfo(o.value))) :
                getEmpty()
            }
          </div>
          {loadingDom}
        </div>);
      };

      const render = select.initRender({
        single: {
          active: () => {
            return <MInput class="m-select-input" v-model={inputValue.value}
                           onFocus={onFocus} onBlur={onBlur}
                           onInput={updateInput} {...inputProps}/>;
          },
          content: initContent
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
          content: initContent
        }
      });

      return withPopover({
        default: render.getActive,
        content: render.getContent
      });
    };

  }
});
