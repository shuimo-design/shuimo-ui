/**
 * @description headless 分页组件
 * @author 阿怪
 * @date 2026/2/25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 *
 * 结构：
 *   div.m-pagination
 *     div.m-page-prev [.m-page-prev-disabled]     -- 上一页
 *     div.m-pager [.m-pager-current]               -- 普通页码
 *     div.m-pager.m-pager-folded                   -- 折叠省略号（可点击跳转）
 *     div.m-page-next [.m-page-next-disabled]      -- 下一页
 *     div.m-page-total                             -- 总条数
 */
import { defineComponent, ref, watch } from 'vue';
import { PaginationCore, usePagination } from '@shuimo-design/ui-core';
import { PaginationProps } from '@shuimo-design/ui-core/components/template/pagination/props';
import './pagination.css';

const { props: paginationProps } = PaginationCore;

export default defineComponent((_props: PaginationProps, { emit }) => {
  const p = _props as Required<PaginationProps>;

  // 内部维护当前页状态，支持非受控（defaultCurrent）和受控（modelValue）两种模式
  const currentValue = ref<number>(p.modelValue ?? p.defaultCurrent ?? 1);

  // 受控模式：外部 modelValue 变化时同步内部状态
  watch(() => p.modelValue, (val) => {
    if (val !== undefined) {
      currentValue.value = val;
    }
  });

  const { getPageNumList, getPageBtnLength } = usePagination(p, currentValue);

  /**
   * 切换页码，同时触发 update:modelValue 和 change 事件
   */
  const changePage = (page: number) => {
    const total = getPageBtnLength();
    // 边界保护：不允许跳转到超出范围的页
    if (page < 1 || page > total) return;
    currentValue.value = page;
    emit('update:modelValue', page);
    emit('change', page);
  };

  const toPrev = () => {
    if (currentValue.value === 1) return;
    changePage(currentValue.value - 1);
  };

  const toNext = () => {
    if (currentValue.value === getPageBtnLength()) return;
    changePage(currentValue.value + 1);
  };

  return () => {
    const pages = getPageNumList();
    // layout prop 按逗号分割，支持灵活排列各部分
    const layoutKeys = p.layout.split(',').map((k: string) => k.trim());
    const totalPages = getPageBtnLength();

    const btnGetter: Record<string, () => any> = {
      /** 总条数区域 */
      total: () => (
        <div class="m-page-total">
          共 <span>{p.total}</span> 条
        </div>
      ),

      /** 上一页按钮 */
      prev: () => (
        <div
          class={['m-page-prev', { 'm-page-prev-disabled': currentValue.value === 1 }]}
          onClick={toPrev}
        >
          ‹
        </div>
      ),

      /** 页码列表（含折叠省略号） */
      pager: () => pages.map((page) => (
        <div
          key={`${page.type}-${page.value}`}
          class={[
            'm-pager',
            page.type === 'folded' ? 'm-pager-folded' : '',
            page.isCurrent ? 'm-pager-current' : '',
          ]}
          onClick={() => changePage(page.jump!)}
        >
          {page.value}
        </div>
      )),

      /** 下一页按钮 */
      next: () => (
        <div
          class={['m-page-next', { 'm-page-next-disabled': currentValue.value === totalPages }]}
          onClick={toNext}
        >
          ›
        </div>
      ),
    };

    return (
      <div class="m-pagination">
        {layoutKeys.map((key: string) => btnGetter[key]?.())}
      </div>
    );
  };
}, {
  name: 'MPagination',
  props: paginationProps,
  emits: ['update:modelValue', 'change'],
});
