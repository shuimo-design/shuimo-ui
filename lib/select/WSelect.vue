<template>
  <div>
    <div class="w-select-div w-cursor" ref="select" @click="showSelectDropdown">
      <span>{{ defaultValue }}</span>
    </div>
    <Teleport to="body">
      <transition name="w-opacity">
        <div v-show="selectDropdown"
             class="select-dropdown select-dropdown-size" :style="dropdownStyle"
             @onresize="leaveDropdown">
          <div class="block-scroll select-dropdown-div select-dropdown-size">
            <div :class="['dropdown-option',option.selected?'selected':'']"
                 v-for="option in optionsCopy"
                 @click="emitValue(option)">
              <span>{{ option[titleParam] }}</span>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script>
/**
 * @Description: 选择框
 * @Author: 菩萨蛮
 * @Date: 2021/1/3 3:50 下午
 * @Version v1.0.3
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 *
 * 选择框不可输入
 * v1.0.1 修复moduleValue不更新问题、keyParam默认值改为title 菩萨蛮
 * v1.0.2 keyParam默认值改为value，新增titleParam
 * v1.0.3 修复之前两个版本错误的参数流转问题
 * TODO：option template功能
 */
import { deepClone, notEmpty } from "../dependents/_utils/tools";

const DEFAULT_SELECT_PADDING = 16;
const DEFAULT_SELECT_BORDER = 3;
const DEFAULT_MARGIN = 5;
const getStyle = (selectStyle, type) => {
  const num = Number(selectStyle[type].replace('px', ''));
  return isNaN(num) ? 0 : num;
}

export default {
  name: 'WSelect',
  props: {
    modelValue: { type: null, default: '' },
    options: { type: Array, default: () => [] },
    keyParam: { type: String, default: 'value' },
    titleParam: { type: String, default: 'title' }
  },
  data() {
    return {
      defaultValue: '请选择',
      select: null,
      dropdownDiv: null,
      selectDropdown: false,
      selectStyle: {
        offsetTop: null,
        offsetLeft: null,
        height: null,
        width: null
      },
      optionsCopy: null
    }
  },
  computed: {
    dropdownStyle() {
      const s = this.selectStyle;
      return {
        left: `${s.offsetLeft - DEFAULT_SELECT_BORDER}px`,
        top: `${s.offsetTop + s.height + DEFAULT_MARGIN}px`,
        width: `${s.width + DEFAULT_SELECT_PADDING}px`
      }
    }
  },
  mounted() {
    this.select = this.$refs['select'];
    this.setDefault();
  },
  watch: {
    modelValue() {
      this.setDefault();
    }
  },
  unmounted() {
    window.removeEventListener('mousedown', this.mousedownEvent);
    window.removeEventListener('resize', this.resizeWindow);
  },
  methods: {
    /**
     * 设置默认值
     */
    setDefault() {
      const defaultSelected = this.options.filter(d => {
        return d[this.keyParam] === this.modelValue;
      });
      this.defaultValue = notEmpty(defaultSelected) ? defaultSelected[0][this.titleParam] : '';
      this.optionsCopy = deepClone(this.options);
      this.optionsCopy.forEach(e => {
        e.selected = e[this.keyParam] === this.modelValue;
      });
    },
    /**
     * 显示下拉框方法
     */
    showSelectDropdown() {
      this.setStyle();
      this.setEvents();
      this.selectDropdown = true;
    },
    /**
     * 设置下拉框样式
     */
    setStyle() {
      const { select } = this;
      // todo 需要优化offset的获取
      const selectStyle = window.getComputedStyle(select);
      this.selectStyle.offsetLeft = select.getBoundingClientRect().left + window.pageXOffset;
      this.selectStyle.offsetTop = select.getBoundingClientRect().top + window.pageYOffset;
      this.selectStyle.height = getStyle(selectStyle, 'height');
      this.selectStyle.width = getStyle(selectStyle, 'width');
    },
    /**
     * 事件绑定
     */
    setEvents() {
      window.addEventListener('mousedown', this.mousedownEvent);
      window.addEventListener('resize', this.resizeWindow)
    },
    /**
     * 隐藏下拉框关联鼠标事件
     * @param e event
     */
    mousedownEvent(e) {
      // todo switch to utils func
      if (e.path && e.path.length > 0) {
        const isSelectDropdown = e.path.some(q => q.classList &&
            Array(...q.classList).includes('select-dropdown'));
        if (!isSelectDropdown) {
          this.leaveDropdown();
        }
      } else {
        this.leaveDropdown();
      }
    },
    /**
     * 改变窗口大小方法
     */
    resizeWindow() {
      this.setStyle();
    },
    /**
     * 离开下拉框方法
     */
    leaveDropdown() {
      this.selectDropdown = false;
      window.removeEventListener('mousedown', this.mousedownEvent);
      window.removeEventListener('resize', this.resizeWindow);
    },
    /**
     * 选择方法
     * @param option 选择的内容
     */
    emitValue(option) {
      this.defaultValue = option[this.titleParam];
      this.$emit('update:modelValue', option[this.keyParam]);
      this.optionsCopy.forEach(e => {
        e.selected = false
      });
      option.selected = true;
      this.$emit('select', option);
      this.leaveDropdown();
    }
  }
};
</script>

<style lang="scss" scoped>

.w-select-div {
  display: inline-block;
  width: 214px;
  height: 31px;
  border: 3px double transparent;
  padding: 0 5px;
  border-image: url("/lib/assets/input/input244.png") 3;
  cursor: pointer;

  span {
    line-height: 31px;
  }
}

</style>
