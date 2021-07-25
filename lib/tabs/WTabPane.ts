import { defineComponent, h } from 'vue'


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
    updateNav () {
      // @ts-ignore
      this.$parent.updateNav()
    }
  },
  watch: {
    label () {
      this.updateNav()
    }
  },
  mounted () {
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
    
    const top = h('div', {
      class: ['pane-line', 'pane-top-line']
    })
  
    const right = h('div', {
      class: ['pane-line', 'pane-right-line']
    })
  
    const bottom = h('div', {
      class: ['pane-line', 'pane-bottom-line']
    })
  
    const left = h('div', {
      class: ['pane-line', 'pane-left-line']
    })
    
    
    return h('div', {
      class: ['w-tab-pane'],
      style: { display: ctx.active ? '' : 'none' }
    }, [main, top, right, bottom, left])
  }
})