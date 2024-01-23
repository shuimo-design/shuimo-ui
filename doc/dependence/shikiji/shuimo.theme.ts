/**
 * @description
 * @author 阿怪
 * @date 2024/1/23 17:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import type { ThemeRegistration } from "shikiji/types.mjs";

export const tokenColors =[{"scope":"comment.line.double-slash","settings":{"foreground":"var(--m-skj-comment)"}},{"scope":"punctuation.definition","settings":{"foreground":"var(--m-skj-punctuation)"}},{"scope":"punctuation.definition.comment","settings":{"foreground":"var(--m-skj-comment)"}},{"scope":"punctuation.definition.block.tag.jsdoc","settings":{"foreground":"var(--m-skj-comment)"}},{"scope":"meta","settings":{"foreground":"var(--m-skj-main)"}},{"scope":"meta.interface","settings":{"foreground":"var(--m-skj-keyword)"}},{"scope":"entity.name.type","settings":{"foreground":"var(--m-skj-value)"}},{"scope":"entity.name.type.interface","settings":{"foreground":"var(--m-skj-keyword)"}},{"scope":"entity.name.type.instance","settings":{"foreground":"var(--m-skj-type)"}},{"scope":"entity.name.function","settings":{"foreground":"var(--m-skj-func)"}},{"scope":"entity.name.tag","settings":{"foreground":"var(--m-skj-value)"}},{"scope":"entity.name.tag.html","settings":{"foreground":"var(--m-skj-vue)"}},{"scope":"entity.other","settings":{"foreground":"var(--m-skj-entity-impl)"}},{"scope":"entity.other.attribute-name","settings":{"foreground":"var(--m-skj-type)"}},{"scope":"keyword.control","settings":{"foreground":"var(--m-skj-keyword-operator)"}},{"scope":"keyword.control.flow","settings":{"foreground":"var(--m-skj-storage)"}},{"scope":"keyword.control.conditional","settings":{"foreground":"var(--m-skj-keyword)"}},{"scope":"keyword.operator","settings":{"foreground":"var(--m-skj-keyword)"}},{"scope":"keyword.operator.operator","settings":{"foreground":"var(--m-skj-keyword-operator)"}},{"scope":"keyword.other","settings":{"foreground":"var(--m-skj-keyword-operator)"}},{"scope":"keyword.other.debugger","settings":{"foreground":"var(--m-skj-debugger)"}},{"scope":"variable","settings":{"foreground":"var(--m-skj-value)"}},{"scope":"variable.object.property","settings":{"foreground":"var(--m-skj-property)"}},{"scope":"variable.object.readwrite.alias","settings":{"foreground":"var(--m-skj-value)"}},{"scope":"variable.language","settings":{"foreground":"var(--m-skj-main)"}},{"scope":"storage","settings":{"foreground":"var(--m-skj-main)"}},{"scope":"storage.type.class.jsdoc","settings":{"foreground":"var(--m-skj-doc-param)"}},{"scope":"string.regexp","settings":{"foreground":"var(--m-skj-regexp)"}},{"scope":"support.type","settings":{"foreground":"var(--m-skj-type)"}},{"scope":"constant.numeric","settings":{"foreground":"var(--m-skj-constant)"}},{"scope":"invalid.illegal.unrecognized-tag","settings":{"foreground":"var(--m-skj-value)"}},{"scope":"text.html.derivative","settings":{"foreground":"var(--m-skj-keyword)"}}];
export const ShuimoTheme: ThemeRegistration = {
  name: 'shuimo',
  tokenColors
};
export default ShuimoTheme;
