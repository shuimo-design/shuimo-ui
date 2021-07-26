import { defineComponent, h } from 'vue'
import { borderDivCreator } from "../_utils/borderDivCreator";


export default defineComponent({
  name: 'WTabPane',
  props: {
    name: [String, Number],
    label: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateNav() {
      // @ts-ignore
      this.$parent.updateNav()
    }
  },
  watch: {
    label() {
      this.updateNav()
    }
  },
  mounted() {
    this.updateNav()
  },
  computed: {
    active() {
      return this.$parent.currentValue === this.name;
    }
  },
  render(ctx: any) {
    const main = h('div', {
      class: ['pane-main']
    }, [ctx.$slots.default()]);

    return h('div', {
      class: ['w-tab-pane'],
      style: { display: ctx.active ? '' : 'none' }
    }, [main, ...borderDivCreator('pane')])
  }
})
