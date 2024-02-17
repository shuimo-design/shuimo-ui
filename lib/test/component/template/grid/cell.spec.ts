/**
 * @description cell test
 * @author 阿怪
 * @date 2023/6/21 23:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { beforeAll, describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MCell from '../../../../components/template/cell/MCell.tsx';
import { CellProps } from '../../../../components/template/cell';

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}

    unobserve() {}

    disconnect() {}
  };
});
describe('cell', () => {


  const getWrapper = (props?: CellProps) => {
    return mount(MCell, {
      props: {
        ...props
      },
      slots: {
        default: '<div>test</div>'
      }
    });
  };

  test('render', () => {
    const wrapper = getWrapper();
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="m-cell">
        <div class="m-cell-main" style="clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);">
          <div>test</div>
        </div>
        <div class="m-cell-c m-cell-border-top" style="top: -2.5px; left: 0px; width: 0px;"></div>
        <div class="m-cell-v m-cell-border-right" style="top: -1.25px; right: -1.5px; height: 0px;"></div>
        <div class="m-cell-c m-cell-border-bottom" style="bottom: -2.5px; right: 0px; width: 0px;"></div>
        <div class="m-cell-v m-cell-border-left" style="bottom: 0px; left: -3px; height: 0px;"></div>
      </div>"
    `);
  });

  describe('props', () => {

    describe('deg', () => {
      test('deg', () => {
        const wrapper = getWrapper({ points: 90 });
        const cell = wrapper.find('.m-cell-c');
        expect(cell.attributes('style')).toContain('rotate(90deg)');
      });
    });
  });


});
