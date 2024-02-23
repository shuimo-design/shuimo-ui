/**
 * @description grid component test
 * @author 阿怪
 * @date 2024/2/23 18:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import MGrid from '../../../../components/template/grid/MGrid';
import MCell from '../../../../components/template/cell/MCell.tsx';

describe('grid', () => {
  vi.mock('../../../../compositions/common/useElementSize.ts', async () => {
    return {
      useElementSize: () => {
        return { w: { value: 100 }, h: { value: 100 } };
      },
    };
  });

  test('render', () => {

    const wrapper = mount(<MGrid gap={20} direction="column" h={245}>
      <MCell>
        <div>hi</div>
      </MCell>
    </MGrid>);

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="m-grid m-grid-column" style="--m-grid-col-gap: 20px; --m-grid-direction: column;">
        <div class="m-cell" style="min-height: 245px; max-height: 245px;">
          <div class="m-cell-main" style="min-height: 245px; max-height: 245px; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);">
            <div>hi</div>
          </div>
          <div class="m-cell-c m-cell-border-top" style="top: -2.5px; left: 0px; width: 100px;"></div>
          <div class="m-cell-v m-cell-border-right" style="top: -1.25px; right: -1.5px; height: 100px;"></div>
          <div class="m-cell-c m-cell-border-bottom" style="bottom: -2.5px; right: 0px; width: 100px;"></div>
          <div class="m-cell-v m-cell-border-left" style="bottom: 0px; left: -3px; height: 100px;"></div>
        </div>
      </div>"
    `);

  });

  test('row', () => {
    const wrapper = mount(<MGrid gap={20} direction="row" h={245}>
      <MCell w={162}>
        <div>hi</div>
      </MCell>
    </MGrid>);

    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div class="m-grid m-grid-row" style="--m-grid-col-gap: 20px; --m-grid-direction: row;">
        <div class="m-cell" style="min-width: 162px; max-width: 162px; min-height: 245px; max-height: 245px;">
          <div class="m-cell-main" style="min-width: 162px; max-width: 162px; min-height: 245px; max-height: 245px; clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);">
            <div>hi</div>
          </div>
          <div class="m-cell-c m-cell-border-top" style="top: -2.5px; left: 0px; width: 100px;"></div>
          <div class="m-cell-v m-cell-border-right" style="top: -1.25px; right: -1.5px; height: 100px;"></div>
          <div class="m-cell-c m-cell-border-bottom" style="bottom: -2.5px; right: 0px; width: 100px;"></div>
          <div class="m-cell-v m-cell-border-left" style="bottom: 0px; left: -3px; height: 100px;"></div>
        </div>
      </div>"
    `);
  });

});
