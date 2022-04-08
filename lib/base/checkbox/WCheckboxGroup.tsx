import { computed, defineComponent, provide, ref, toRefs, watch } from 'vue';
import { CheckboxGroupContextKey, props } from './checkboxGroupApi';

export default defineComponent({
  name: 'WCheckboxGroup',
  props,
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const groupValue = ref(props.modelValue)
    const triggerUpdate = ref(Symbol());
    const registeredValuesMap = ref<Map<Symbol, string>>(new Map());
    const cancelValue = (id: Symbol) => {
      registeredValuesMap.value.delete(id);
      triggerUpdate.value = Symbol();
    };
    const registerValue = (id: Symbol, value: string) => {
      registeredValuesMap.value.set(id, value);
      triggerUpdate.value = Symbol();
    };
  
    const checkHandle = (_label: string, _value: string) => {
      const optionIndex = groupValue.value.indexOf(_value);
      const value = [...groupValue.value];
      if (optionIndex === -1) {
        value.push(_value);
      } else {
        value.splice(optionIndex, 1);
      }
      emit('update:modelValue', value);
    };
  
    provide(CheckboxGroupContextKey, {
      cancelValue,
      registerValue,
      groupValue,
      checkHandle,
      disabled: computed(() => props.disabled),
    });
  
    const registeredValues = ref(new Map());
    watch(triggerUpdate, () => {
      const valueMap = new Map();
      for (const value of registeredValuesMap.value.values()) {
        valueMap.set(value, true);
      }
      registeredValues.value = valueMap;
    });
    
    watch(() => props.modelValue, (value) => {
      groupValue.value = value || [];
    });
    
    
    return () => {
      return (
        <div class="w-checkbox-group">
          {slots.default?.()}
        </div>
      )
    }
  }
})