/**
 * @description annotate syntax for postcss test
 * @author 阿怪
 * @date 2023/2/18 16:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import postcss from 'postcss';
import { postcssAnnotate } from '../syntax/annotate';

const style = `.annotate{
  // this is red color
  color: red;
}`;


describe('annotate', () => {

  const p = postcss();

  test('remove annotate', async () => {
    const result = await p.process(style, {
      syntax: postcssAnnotate
    });
    expect(result.css).toBe(`.annotate{
    color: red;
}`);
  });

});
