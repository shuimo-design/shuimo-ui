/**
 * @Description: 代码注入插件
 * @Author: 菩萨蛮
 * @Date: 2021/8/11 5:19 下午
 * @Version v1.0.0
 *
 * 公司的业务千篇一律，复杂的代码好几百行。
 */


const resetCode = (code: string) => {
  const templateList = code.split('<template>'); // 为了获取最前面的<template>
  const [preTemplate, ...endTemplate] = templateList;
  const data = endTemplate.join('<template>');
  const leftTemplateList = data.split('</template>');
  const leftTemplateListTemp = leftTemplateList.concat(); // 备份
  const leftTemplateListPre = leftTemplateListTemp.splice(-1, 1); //后面</template>前的内容

  const left = leftTemplateListPre.join('</template>');
  const template = leftTemplateListTemp.join('</template>');

  let temp = code;
  temp = temp.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/\'/g, '&#39;')
    .replace(/\"/g, '&quot;');
  return `<template>
  <div class="code-div">
    ${template}
    <PrismCode type="html" languageType="html" :code="&#x60;${temp}&#x60;">
    </PrismCode>
  </div>
</template>${left}`;
}

export const codeHtmlPlugin = {
  name: 'code-html-plugin',
  transform(code: string, path: string) {
    if (path.includes('/page/demos')&&!path.includes('?')) {
      return resetCode(code);
    }
    return code;
  }
}
