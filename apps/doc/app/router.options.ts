/**
 * @description 路由转发
 * @author 阿怪
 * @date 2022/11/26 04:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import type { RouterConfig } from '@nuxt/schema';

export default <RouterConfig>{
  routes: (routes) => {

    // quickStart
    const main = routes.find(route=>route.path==='/main');
    if(main&&main.children){
      const quickStart = main.children.find(c=>c.path==='quickStart');
      if(quickStart){
        quickStart.alias = '/quickStart';
      }
    }


    // 如果是doc
    const docsRoute = routes.find(r => r.name === 'docs');
    if (!docsRoute || !docsRoute.children) {return routes;}
    const docsComponents = docsRoute.children.find(r => r.name === 'docs-components');
    if (!docsComponents || !docsComponents.children) {return routes;}
    const docs = docsComponents.children.filter(r => r.name !== 'docs-components-slug');
    docs.forEach(doc => {
      const name = doc.path.split('/').pop();
      if (Array.isArray(doc.alias)) {
        doc.alias = [...new Set([...doc.alias, `/${name}`])];
        return;
      }
      doc.alias = [`/${name}`];
    });
    return routes;
  }
};
