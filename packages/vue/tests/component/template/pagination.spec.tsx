/**
 * @description 分页测试用例
 * @author 阿怪
 * @date 2022/5/2 06:41
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MPagination from '../../../lib/template/pagination/MPagination';

describe('分页组件', function () {
  test(':current', async () => {
    const wrapper = mount(MPagination, {
      props: {
        current: 1,
        total: 100
      }
    });
    expect(wrapper.find('.m-current-page').text()).toEqual('1');
    await wrapper.setProps({
      current: 2
    });
    expect(wrapper.find('.m-current-page').text()).toEqual('2');
  });

  test(':current__model', async () => {
    const wrapper = mount({
      data() {
        return {
          current: 1
        };
      },
      render() {
        return <MPagination total={100} v-model={this.current} />;
      }
    });
    await wrapper.find('.m-pager:nth-child(1)').trigger('click');
    expect(wrapper.vm.$data.current).toEqual(1);
  });

  test('prev click', async () => {
    const fn = vi.fn();
    const wrapper = mount({
      data() {
        return {
          current: 1
        };
      },
      render() {
        return <MPagination total={100} v-model={this.current} />;
      }
    });

    await wrapper.find('.m-page-prev').trigger('click');
    expect(fn).not.toHaveBeenCalled();
  });

  test('next click', async () => {
    const fn = vi.fn();
    const wrapper = mount({
      data() {
        return {
          current: 1
        };
      },
      render() {
        return <MPagination total={11} v-model={this.current} />;
      }
    });

    await wrapper.find('.m-page-next').trigger('click');
    expect(wrapper.vm.$data.current).toEqual(2);
    await wrapper.find('.m-page-next').trigger('click');
    expect(fn).not.toHaveBeenCalled();
  });
});
