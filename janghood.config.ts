/**
 * @description janghood lint config
 * @author 阿怪
 * @date 2022/11/18 03:04
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineJhConfig } from '@janghood/config';


export default defineJhConfig({
  base: {
    include: ['lib/**/*', 'doc/**/*'],
    exclude: ['*.webp', '*.png', '*.css', '*.md','*.ico','*.ttf','*.svg','**/dist/**/*'],
  },
  lint: {
    eslint: true,
    commitlint: true,
  },
});
