/**
 * @description cell test
 * @author 阿怪
 * @date 2023/6/21 23:54
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MCell from '../../../../lib/template/MCell';
import { CellProps } from '@shuimo-design/core/lib/template/cell';


describe('cell', () => {


  const getWrapper = (props?: CellProps) => {
    return mount(MCell, {
      props: {
        rotatePosition: 'top-left',
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
      "<div class=\\"m-cell m-cell-b-top m-cell-b-left\\" style=\\"--m-cell-clip-path: polygon(0% 0%, 100% 0%, 100% 100%, NaN% 100%); --m-cell-cos: 1; --m-cell-deg: rotate(0deg); --m-cell-minus-w: 0px; --m-cell-bl-to: top center; --m-cell-bb-r: 0;\\">
        <div class=\\"m-cell-main\\">
          <div class=\\"m-cell-inner\\">
            <div>test</div>
          </div>
        </div>
        <div class=\\"m-cell-c m-cell-border-top\\"></div>
        <div class=\\"m-cell-c m-cell-border-bottom\\"></div>
        <div class=\\"m-cell-v m-cell-border-left\\"></div>
        <div class=\\"m-cell-v m-cell-border-right\\"></div>
      </div>"
    `);
  });

  describe('props', () => {
    describe('rotatePosition', () => {

      test('top-left', () => {
        const wrapper = getWrapper({ rotatePosition: 'top-left' });
        const cell = wrapper.find('.m-cell');
        expect(cell.classes()).toMatchObject(['m-cell', 'm-cell-b-top', 'm-cell-b-left']);
      });

      test('top-right', () => {
        const wrapper = getWrapper({ rotatePosition: 'top-right' });
        const cell = wrapper.find('.m-cell');
        expect(cell.classes()).toMatchObject(['m-cell', 'm-cell-b-top', 'm-cell-b-right']);
      });

      test('bottom-left', () => {
        const wrapper = getWrapper({ rotatePosition: 'bottom-left' });
        const cell = wrapper.find('.m-cell');
        expect(cell.classes()).toMatchObject(['m-cell', 'm-cell-b-bottom', 'm-cell-b-left']);
      });

      test('bottom-right', () => {
        const wrapper = getWrapper({ rotatePosition: 'bottom-right' });
        const cell = wrapper.find('.m-cell');
        expect(cell.classes()).toMatchObject(['m-cell', 'm-cell-b-bottom', 'm-cell-b-right']);
      });

    });

    describe('deg', () => {
      test('deg', () => {
        const wrapper = getWrapper({ rotatePosition: 'top-left', deg: 90 });
        const cell = wrapper.find('.m-cell');
        expect(cell.attributes('style')).toContain('rotate(-90deg)');
      });
    });
  });


});
