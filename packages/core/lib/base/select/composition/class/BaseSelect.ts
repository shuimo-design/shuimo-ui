/**
 * @description base select interface
 * @author 阿怪
 * @date 2023/5/17 11:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MRef, MRefValue } from '../../../../../composition/common/MRef';
import useSelectTools from '../useSelectTools';
import { SelectProps } from '../../index';
import { OptionType } from '../../useSelect';
import { isEmpty } from '@shuimo-design/tools/empty';


export type ISelectOptions<OptionValue, JSXNode> = {
  active: (data?: () => { tags: Array<SelectOptions<OptionValue>> }) => JSXNode,
  content: (data: () => { options: Array<SelectOptions<OptionValue>> }) => JSXNode,
}

export type SelectOptions<OptionValue> = { value: OptionValue, isSelected: boolean, index: number };

export type SelectCreatorOptions<OptionValue, JSXNode> = {
  props: Required<SelectProps>,
  value: {
    inputValue: MRefValue<any>,
    selectOptions: MRefValue<Array<SelectOptions<OptionValue>>>,
    selectDisplayOptions: MRefValue<Array<SelectOptions<OptionValue>>>,
    selectTags: MRefValue<Array<SelectOptions<OptionValue>>>,
  },
}

type InitRenderOptionRender<OptionValue, JSXNode> = {
  single: ISelectOptions<OptionValue, JSXNode>,
  multiple: ISelectOptions<OptionValue, JSXNode>,
};

type TMRef<T> = ReturnType<typeof MRef<T>>;

export abstract class BaseSelect<OptionValue, JSXNode> {

  options?: SelectCreatorOptions<OptionValue, JSXNode>;
  inputValueRef?: TMRef<any>;
  selectOptions?: TMRef<SelectOptions<OptionValue>[]>;
  selectDisplayOptions?: TMRef<SelectOptions<OptionValue>[]>;
  selectTags?: TMRef<SelectOptions<OptionValue>[]>;
  tools?: ReturnType<typeof useSelectTools>;

  protected constructor(options: SelectCreatorOptions<OptionValue, JSXNode>) {
    this.options = options;
    this.inputValueRef = MRef(options.value.inputValue);
    this.selectOptions = MRef(options.value.selectOptions);
    this.selectDisplayOptions = MRef(options.value.selectDisplayOptions);
    this.selectTags = MRef(options.value.selectTags);

    this.tools = useSelectTools(options.props);
    this.init();
  }

  get modelValue() {
    const modelValue = this.options?.props.modelValue;
    if (isEmpty(modelValue)) {
      return [];
    }
    return this.options?.props.modelValue;
  }

  baseFilter(option: OptionType) {
    return true;
  }

  callFilter(option: OptionType) {
    const { readonly: _readonly, filter } = this.options?.props!;

    if (_readonly) {return true;}
    if (isEmpty(this.inputValueRef?.value)) {return true;}
    if (filter) {
      return filter(option, this.inputValueRef?.value);
    }
    return this.baseFilter(option);
  }

  init() {
    this.updateSelectInfo();
    this.updateInputValue();
  }

  updateSelectInfo() {
    this.selectOptions!.value = (this.options?.props.options ?? [])
      .map((o, index) => {
        return {
          value: o,
          index,
          isSelected: this.matchSelected(o) ?? false
        };
      });
    this.updateSelectDisplayOptions();
    this.updateSelectTags();
  }

  updateSelectDisplayOptions() {
    this.selectDisplayOptions!.value = this.selectOptions!.value.filter(o => this.callFilter(o.value));
  }

  updateSelectTags() {
  }

  updateInputValue() {
    const findRes = this.options?.props.options.find(o => this.tools?.getModelValue(o) === this.modelValue);
    this.inputValueRef!.value = findRes ? this.tools?.getInputValue(findRes) : '';
  }

  setInputValue(value?: OptionType) {
    this.inputValueRef!.value = this.tools?.getInputValue(value);
  }

  getModelValue(value?: OptionType) {
    return this.tools?.getModelValue(value);
  }

  onClickOption(index: number) {
    const option = this.selectOptions!.value[index];
    if (!option) {return;}
    option.isSelected = !option.isSelected;
    this.updateSelectTags();
    this.updateSelectDisplayOptions();

    return {
      modelValue: this.getModelValue(option.value)
    };
  }


  baseMatchSelected(o: OptionValue): boolean {
    return this.modelValue === this.tools?.getModelValue(o);
  }

  matchSelected(o: OptionValue) {
    if (this.options?.props.toMatch) {
      return this.options?.props.toMatch?.(o, this.modelValue);
    }
    return this.baseMatchSelected(o);
  }

  onInput() {
    this.updateSelectInfo();
  }

  onDeleteTag(tag: SelectOptions<OptionValue>) {}
}

export class SingleSelect<OptionValue, JSXNode> extends BaseSelect<OptionValue, JSXNode> {
  constructor(options: SelectCreatorOptions<OptionValue, JSXNode>) {super(options);}

  onClickOption(index: number) {
    this.selectOptions?.value.forEach(o => {o.isSelected = false;});
    this.inputValueRef!.value = this.tools?.getInputValue(this.selectOptions!.value[index].value);
    return super.onClickOption(index);
  }

  initRender(render: InitRenderOptionRender<OptionValue, JSXNode>) {
    const getActive = () => {
      return render.single.active();
    };

    const getContent = () => {
      return render.single.content(() => ({ options: this.selectDisplayOptions!.value ?? [] }));
    };

    return {
      getActive,
      getContent
    };
  }
}

export class MultipleSelect<OptionValue, JSXNode> extends BaseSelect<OptionValue, JSXNode> {
  constructor(options: SelectCreatorOptions<OptionValue, JSXNode>) {super(options);}

  onClickOption(index: number) {
    this.setInputValue();
    return super.onClickOption(index);
  }

  setInputValue() {
    this.inputValueRef!.value = '';
  }

  getModelValue() {
    return this.selectOptions!.value.filter(o => o.isSelected).map(o => this.tools?.getModelValue(o.value));
  }

  updateSelectTags() {
    this.selectTags!.value = this.selectOptions!.value.filter(o => o.isSelected);
  }

  onDeleteTag(tag: SelectOptions<OptionValue>) {
    this.selectOptions!.value[tag.index].isSelected = false;
    this.updateSelectTags();
  }

  baseMatchSelected(o: OptionValue): boolean {
    return this.modelValue.includes(this.tools?.getModelValue(o));
  }

  updateInputValue() {
    this.inputValueRef!.value = '';
  }

  baseFilter(option: OptionType) {
    return this.inputValueRef!.value===this.tools?.getInputValue(option);
  }

  initRender(render: InitRenderOptionRender<OptionValue, JSXNode>) {
    const getActive = () => {
      const tags = this.selectTags!.value ?? [];

      return render.multiple.active(() => ({ tags }));
    };

    const getContent = () => {
      return render.multiple.content(() => ({ options: this.selectDisplayOptions!.value ?? [] }));
    };

    return {
      getActive,
      getContent
    };
  }
}