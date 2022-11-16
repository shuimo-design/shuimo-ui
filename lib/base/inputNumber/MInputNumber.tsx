import { h, defineComponent } from 'vue';
import MBorder from '../../other/border/MBorder';
import { props } from './api';

export default defineComponent({
  name: 'MInputNumber',
  props,
  data() {return { currentVal: 0 };},
  mounted() {
    this.currentVal = this.modelValue;
  },
  watch: {
    modelValue() {
      this.currentVal = this.modelValue;
    }
  },
  methods: {
    inputHandle(e: any) {
      const inputNumber = Number(e.target.value);
      if (e.target.value !== '') {
        this.currentVal = Number(e.target.value);
      }
      if (inputNumber > this.max) {
        this.currentVal = this.max;
      }
      if (inputNumber < this.min) {
        this.currentVal = this.min;
      }
      this.$emit('update:modelValue', Number(this.currentVal));
    }
  },
  render() {
    const { currentVal } = this;
    const { inputHandle } = this;

    return h(MBorder, { class: 'm-input-number' }, () => (
      <input type="number" class="m-input-number-inner" onInput={inputHandle} value={currentVal} />
    ));
  }
});
