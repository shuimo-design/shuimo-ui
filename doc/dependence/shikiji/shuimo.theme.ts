/**
 * @description
 * @author 阿怪
 * @date 2024/1/23 17:53
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import type { ThemeRegistration } from "shikiji/types.mjs";

export const tokenColors =[{"scope":["comment.line.double-slash","comment.block","punctuation.definition.comment","punctuation.definition.block.tag.jsdoc"],"settings":{"foreground":"var(--m-skj-comment)"}},{"scope":["punctuation.definition"],"settings":{"foreground":"var(--m-skj-punctuation)"}},{"scope":["punctuation.definition.parameters","punctuation.separator.key-value","text.html.derivative"],"settings":{"foreground":"var(--m-skj-text)"}},{"scope":["meta","keyword.operator.expression","keyword.operator.logical","variable.language","storage"],"settings":{"foreground":"var(--m-skj-main)"}},{"scope":["meta.interface","entity.name.type.interface","keyword.control.conditional","keyword.operator"],"settings":{"foreground":"var(--m-skj-keyword)"}},{"scope":["entity.name.type","entity.name.tag","variable","variable.object.readwrite.alias","variable.object.enummember","invalid.illegal.unrecognized-tag"],"settings":{"foreground":"var(--m-skj-value)"}},{"scope":["entity.name.type.instance","entity.other.attribute-name","support.type"],"settings":{"foreground":"var(--m-skj-type)"}},{"scope":["entity.name.function","entity.other.attribute-name.class"],"settings":{"foreground":"var(--m-skj-func)"}},{"scope":["entity.name.tag.html"],"settings":{"foreground":"var(--m-skj-vue)"}},{"scope":["entity.other"],"settings":{"foreground":"var(--m-skj-entity-impl)"}},{"scope":["keyword.control","keyword.operator.operator","keyword.other"],"settings":{"foreground":"var(--m-skj-keyword-operator)"}},{"scope":["keyword.control.flow"],"settings":{"foreground":"var(--m-skj-storage)"}},{"scope":["keyword.other.debugger"],"settings":{"foreground":"var(--m-skj-debugger)"}},{"scope":["variable.object.property"],"settings":{"foreground":"var(--m-skj-property)"}},{"scope":["storage.type.class.jsdoc"],"settings":{"foreground":"var(--m-skj-doc-param)"}},{"scope":["string.regexp"],"settings":{"foreground":"var(--m-skj-regexp)"}},{"scope":["constant.numeric"],"settings":{"foreground":"var(--m-skj-constant)"}}];
export const ShuimoTheme: ThemeRegistration = {
  name: 'shuimo',
  tokenColors
};
export default ShuimoTheme;
