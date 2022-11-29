import { h, defineComponent, ref, watch } from 'vue';
import MBorder from '../../other/border/MBorder';
import { InputNumber, props } from './api';

export default defineComponent({
  name: 'MInputNumber',
  emits: ['update:modelValue','change'],
  props,
  setup(props,{emit,slots}){
    const { placeholder,disabled,modelValue } = props;
    const currentValue = ref<InputNumber>(modelValue);
   
    const handleInputChange = (e:any,value?:InputNumber)=>{
      const val  = e.target.value ?? value ;
      validate(val,e)
   
    }
    const validate = (value:InputNumber,e?:any)=>{
      if (!isNaN(+value) || value === '') {
        setCurrentValue(value,e);
      }
    }
    const setCurrentValue = (newVal: InputNumber,e?:any) => {
      const oldVal = currentValue.value;
      const { min,max,precision  } = props;
      if (+newVal >= max){
        newVal = max;
        e.target.value = newVal 
      }else if(newVal <=min){
        newVal = min;
      }else if(oldVal === newVal){
        return;
      }else if(precision !== 0&& (`${newVal}`.length - (`${newVal}`.indexOf('.')+1 ) >= precision)){
        newVal = Number(`${newVal}`.substring(0,`${newVal}`.indexOf(".")+(precision+1)));
        e.target.value = newVal
      }
      currentValue.value = newVal;
      emit('update:modelValue', currentValue.value );
      emit('change', currentValue.value , oldVal);
    };
    watch(()=>props.modelValue,(val)=>{
      validate(val)
    })
    return ()=>{
        return h(MBorder, { class: 'm-input-number' }, () => (
          <input type="number"  disabled={disabled}  placeholder={placeholder} class="m-input-number-inner"  onInput={handleInputChange} value={currentValue.value} />
        ));
    }
  }
});
