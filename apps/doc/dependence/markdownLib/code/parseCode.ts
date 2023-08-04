/**
 * @Description: 代码高亮模块
 * @Author: 阿怪
 * @Date: 2022/3/21 10:16 PM
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */
import Prism from 'prismjs';
import 'prismjs/components/prism-haml.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-bash.js';
import 'prismjs/components/prism-scss.js';


Prism.languages['vue'] = {
  ...Prism.languages.haml,
  ...Prism.languages.typescript,
  ...Prism.languages.scss,
}

enum highlightType {
  'typescript' = 'typescript',
  'shell' = 'shell',
  'vue' = 'vue',
  'scss' = 'scss',
}

const highlight = (code: string, type: highlightType) => {
  if (type === highlightType.vue) {
    return Prism.highlight(code, Prism.languages.vue, highlightType.vue)
      .replace(/\{/g, '&#123;')
      .replace(/\}/g, '&#125;')
  }
  if (type === highlightType.typescript) {
    return Prism.highlight(code, Prism.languages.typescript, highlightType.typescript);
  }
  if (type === highlightType.shell) {
    return Prism.highlight(code, Prism.languages.shell, highlightType.shell)
  }
  if (type === highlightType.scss) {
    return Prism.highlight(code, Prism.languages.scss, highlightType.scss)
  }
  return code;
}

export const resetCode = (code: string) => {
  const templateList = code.split('<template>'); // 为了获取最前面的<template>
  const [, ...endTemplate] = templateList;
  const data = endTemplate.join('<template>');
  const leftTemplateList = data.split('</template>');
  const leftTemplateListTemp = leftTemplateList.concat(); // 备份
  const leftTemplateListPre = leftTemplateListTemp.splice(-1, 1); //后面</template>前的内容

  leftTemplateListPre.join('</template>');
  leftTemplateListTemp.join('</template>');

  const temp = highlight(code, highlightType.vue);
  return `<pre class="language-vue"><code ref="element">${temp}</code></pre>`;
}


export const prismCode = (code: string) => {
  code = code.replaceAll(/<pre><code class="([^"]+)">([^<]*)<\/code><\/pre>/g, (str, type, code) => {
    type = type.replace('language-', '');

    code = code.replaceAll('&gt;', '>').replaceAll('&lt;', '<');

    if (Object.keys(highlightType).includes(type)) {
      code = highlight(code, type);
      return `<pre class="language-${type}"><code>${code}</code></pre>`;
    }
    return str;
  });

  return code;

}
