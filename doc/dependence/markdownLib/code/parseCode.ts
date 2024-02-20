/**
 * @Description: 代码高亮模块
 * @Author: 阿怪
 * @Date: 2022/3/21 10:16 PM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import { type BundledLanguage, codeToTokensBase, type SpecialLanguage } from 'shiki';
import { ShuimoTheme } from '../../shikiji/shuimo.theme';




const toHTMl = async (code: string, lang: BundledLanguage | SpecialLanguage) => {
  const nodesList = await codeToTokensBase(code, {
    lang,
    theme: ShuimoTheme
  });
  const r2 = nodesList.map(nodes => {
    return nodes.map(node => {
      const content = node.content
        .replaceAll('{', '&#123;')
        .replaceAll('}', '&#125;')
        .replaceAll('>', '&gt;')
        .replaceAll('<', '&lt;');
      return `<span style="color:${node.color}" class="token">${content}</span>`;
    }).join('');
  }).join('\n');
  return `<pre class="shiki-pre"><code>${r2}</code></pre>`;
};


export const resetCode = async (code: string) => {
  const templateList = code.split('<template>'); // 为了获取最前面的<template>
  const [, ...endTemplate] = templateList;
  const data = endTemplate.join('<template>');
  const leftTemplateList = data.split('</template>');
  const leftTemplateListTemp = leftTemplateList.concat(); // 备份
  const leftTemplateListPre = leftTemplateListTemp.splice(-1, 1); //后面</template>前的内容

  leftTemplateListPre.join('</template>');
  leftTemplateListTemp.join('</template>');

  return toHTMl(code, 'vue');
};
