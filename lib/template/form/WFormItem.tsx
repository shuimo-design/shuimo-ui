import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WFormItem',
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
  },
  render() {
    const { label, prop } = this.$props;
    return (
      <div class="w-form-item">
        <label
          for={prop}
          class="w-form-item__label"
        >
          {label || (this.$slots.label && this.$slots.label())}
        </label>
        <div class="w-form-item__content">
          {this.$slots.default && this.$slots.default()}
        </div>
      </div>
    )
  }
})