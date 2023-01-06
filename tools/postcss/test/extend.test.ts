/**
 * @description extend plugin for postcss test
 * @author 阿怪
 * @date 2023/1/5 17:40
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import postcss from 'postcss';

import { postcssExtend } from '../plugins/extend';

const style = `.base {
  color: red;
}

.to-extend {
  @extend .base;

  font-size: 20px;
}
`;
describe('extend atRule', () => {
  const p = postcss([postcssExtend]);
  test('extend atRule', () => {
    p.process(style).then((result) => {
      expect(result.css).toMatchInlineSnapshot(`
        ".base {
          color: red;
        }

        .to-extend {
          color: red;

          font-size: 20px;
        }
        "
      `);
    });
  });
});
