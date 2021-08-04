import { defineComponent, h } from 'vue'
import { borderDivCreator } from "../_utils/borderDivCreator";

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
      navList: [] as TabTypeArr
    }
  },
  watch: {
    modelValue() {
      this.currentValue = this.modelValue
    }
  },
  methods: {
    getTabs() {
      const vm: any = this;
      const childrenList = vm.$slots.default().map((c: any) => c.children).flat()

      if (childrenList.length) {
        return childrenList.filter((c: any) => c.type.name === 'WTabPane')
      } else {
        return vm.$slots.default().filter((child: any) => {
          return child.type.name === 'WTabPane';
        });
      }
    },
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
    const { navList, currentValue } = ctx;
    const tabClass = (tab: TabType) => ['w-tabs-tab', { 'w-tabs-tab-active': tab.name === currentValue }];

    const tabs = navList.map((tab: TabType, index: number) => {
      const main = h('div', { class: ['tab-main'] }, [tab.label])
      return h('div', {
        class: tabClass(tab),
        key: tab.name,
        onClick: (event: Event) => {
          event.stopPropagation();
          ctx.handleChange(index);
        }
      }, [main, ...borderDivCreator('tab')]);
    });

    const bar = h('div', { class: ['w-tabs-bar'] }, [tabs]);

    const pane = h('div', { class: ['w-tabs-content'] }, [ctx.$slots.default()]);

    return h('div', { class: ['w-tabs'] }, [bar, pane]);
  }
})
