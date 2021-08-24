import { h, defineComponent } from "vue";
import WBorder from "../../other/border/WBorder";

export default defineComponent({
  name: 'WInputNumber',
  props: {
    modelValue: {type: Number, default: 0},
    max: {type: Number, default: Infinity},
    min: {type: Number, default: -Infinity}
  },
  data() {
    return {
      currentVal: 0
    }
  },
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
      if (inputNumber  > this.max) {
        this.currentVal = this.max;
      }
      if (inputNumber  < this.min) {
        this.currentVal = this.min;
      }
      this.$emit('update:modelValue', Number(this.currentVal));
    }
  },
  render() {
    let { currentVal } = this;
    const { inputHandle } = this;
    return (
        <WBorder class="w-input-number">
          <input type="number"
                 class="w-input-number-inner"
                 onInput={inputHandle}
                 value={currentVal}/>
        </WBorder>
    )
  }
})
