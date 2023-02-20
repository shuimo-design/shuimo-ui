/**
 * @description esbuildTransform test
 * @author 阿怪
 * @date 2023/2/20 15:37
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { describe, test, expect } from 'vitest';
import { esbuildTransform } from '../../../plugins/vite/esbuildTransform';


describe('esbuildTransform', () => {

  test('add import right', async () => {
    const res = await esbuildTransform(`const a = <div></div>`, 'm');
    expect(res).toMatchInlineSnapshot(`
      "import { m } from \\"@shuimo-design/jsx/jsxTools\\";
      const a = /* @__PURE__ */ m(\\"div\\", null);
      "
    `);
  });

  describe('replace class right', () => {

    // todo ?? some problem with class string template expression...

    test('attr', async () => {
      const res = await esbuildTransform(`
const value = false;
const a = <div class={[value?'hi':\`\${value}-default\`]}></div>`, 'm');
      expect(res).toMatchInlineSnapshot(`
        "import { m } from \\"@shuimo-design/jsx/jsxTools\\";
        const value = false;
        const a = /* @__PURE__ */ m(\\"div\\", { class: [value ? \\"hi\\" : \`\${value}-default\`] });
        "
      `);
    });

  });

});
