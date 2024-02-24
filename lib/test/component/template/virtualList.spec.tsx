/**
 * @description virtualList component test
 * @author 阿怪
 * @date 2024/2/24 14:33
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { describe, test } from 'vitest';
import { mount } from '@vue/test-utils';
import MVirtualList from '../../../components/template/virtualList/MVirtualList.tsx';

describe('virtualList', () => {



  test('render', () => {
    const wrapper = mount({
      components: { MVirtualList },
      template: `
        <MVirtualList :list="['子1', '丑2', '寅3', '卯4', '辰5', '巳6', '午7', '未8', '申9', '酉10', '戌11', '亥12']">
          <template #default="{data}">
            <div>{{data}}</div>
          </template>
        </MVirtualList>
      `,
    });
    console.log(wrapper.html());
  });

});
