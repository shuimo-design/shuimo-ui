/**
 * @description 显示的dom管理方法
 * @author 阿怪
 * @date 2021/8/27 11:22 下午
 * @version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { computed, reactive, ref, onMounted, getCurrentInstance, ComponentInternalInstance } from 'vue';
import { getStyle } from "../../../dependents/_utils/tools";

export type selectStyleType = {
  offsetTop: number,
  offsetLeft: number,
  height: number,
  width: number,
}

const DEFAULT_SELECT_PADDING = 16;
const DEFAULT_SELECT_BORDER = 3;
const DEFAULT_MARGIN = 5;

export default function ShowDomHandler() {

  const selectStyle: selectStyleType = reactive({
    offsetTop: 0,
    offsetLeft: 0,
    height: 0,
    width: 0
  });

  /**
   * 选择框dom
   */
  const selectRef = ref<HTMLElement | null>(null);


  /**
   * 下拉框的样式
   */
  const dropdownStyle = computed(() => {
    return {
      left: `${selectStyle.offsetLeft - DEFAULT_SELECT_BORDER}px`,
      top: `${selectStyle.offsetTop + selectStyle.height + DEFAULT_MARGIN}px`,
      width: `${selectStyle.width + DEFAULT_SELECT_PADDING}px`
    }
  });

  const setStyle = () => {
    if (selectRef && selectRef.value) {
      const cssStyleDeclaration = window.getComputedStyle(selectRef.value);
      selectStyle.offsetLeft = selectRef.value.getBoundingClientRect().left + window.pageXOffset;
      selectStyle.offsetTop = selectRef.value.getBoundingClientRect().top + window.pageYOffset;
      selectStyle.height = getStyle(cssStyleDeclaration, 'height');
      selectStyle.width = getStyle(cssStyleDeclaration, 'width');
    }
  }

  const setElement = () => {
    const internalInstance: ComponentInternalInstance | null = getCurrentInstance();
    if (internalInstance!.vnode!.el) {
      const children = internalInstance!.vnode!.el.getElementsByClassName('m-border-main');
      if (children && children.length > 0) {
        selectRef.value = children[0];
      }
    }
  }

  onMounted(() => {
    setElement();
  });

  return {
    setStyle,
    dropdownStyle
  }

}
