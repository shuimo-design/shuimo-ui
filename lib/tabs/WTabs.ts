import { defineComponent, h } from 'vue'
type TabType = {
  label: string,
  name: string | number
  show?: boolean
}

type TabTypeArr = Array<TabType>

export default defineComponent({
  name: 'WTabs',
  props: {
    modelValue: [String, Number]
  },
  data() {
    return {
      currentValue: this.modelValue,
      navList: []
    }
  },
  watch: {
    modelValue() {
      this.currentValue = this.modelValue
    }
  },
  methods: {
    tabClass (tab: TabType) {
      return [
        'w-tabs-tab',
        {
          'w-tabs-tab-active': tab.name === this.currentValue
        }
      ]
    },
    getTabs() {
      const childrenList = this.$slots.default().map((c: any) => c.children).flat()
      
      if (childrenList.length) {
        return childrenList.filter((c: any) => c.type.name === 'WTabPane')
      } else {
        return this.$slots.default().filter((child: any) => {

          return child.type.name === 'WTabPane';
        });
      }
    }
    ,
    updateNav() {
      this.navList = [];
      this.getTabs().forEach((pane: any, index: number) => {
        const { props } = pane
        this.navList.push({
          label: props.label,
          name: props.name || index
        })
        if (!props.name) props.name = index;
        if (index === 0) {
          if (!this.currentValue) {
            this.currentValue = props.name || index;
          }
        }
      })
    },
    handleChange(index: number) {
      let nav: TabType = this.navList[index]
      let name = nav.name
      this.currentValue = name
      this.$emit('update:modelValue', name)
    }
  },
  render(ctx: any) {
    
    const { navList } = ctx.$data;
    
    const top = h('div', {
      class: ['tab-line', 'tab-top-line']
    })
  
    const right = h('div', {
      class: ['tab-line', 'tab-right-line']
    })
  
    const bottom = h('div', {
      class: ['tab-line', 'tab-bottom-line']
    })
  
    const left = h('div', {
      class: ['tab-line', 'tab-left-line']
    })
    
    const tabs = navList.map((tab: TabType, index: number) => {
      const main = h('div', {
        class: ['tab-main']
      }, [tab.label])
      return h('div', {
        class: [ctx.tabClass(tab)],
        key: tab.name,
        onClick: (event: Event) => {
          event.stopPropagation();
          ctx.handleChange(index)
        }
      }, [top, right, bottom, left, main]);
    });
    
    const bar = h('div', {
      class: ['w-tabs-bar']
    }, [tabs]);
    
    const pane = h('div', {
      class: ['w-tabs-content']
    }, [ctx.$slots.default()])
    
    return h('div', {
      class: ['w-tabs']
    }, [bar, pane])
  }
})