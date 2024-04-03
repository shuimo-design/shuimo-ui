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
  routes: routes => {
    // quickStart
    const handleMain = (lang = '') => {
      const main = routes.find(route => route.path === `${lang}/main`);
      //  摆烂，优化这段代码
      if (main && main.children) {
        const quickStart = main.children.find(c => c.path === 'quickStart');
        if (quickStart) {
          quickStart.alias = `${lang}/quickStart`;
        }
      }
    };

    handleMain();
    handleMain('/en');

    // 如果是doc
    const docsRoutes = routes.filter(r => r.path.includes('/docs'));
    for (const docsRoute of docsRoutes) {
      if (!docsRoute || !docsRoute.children) {return routes;}
      const colorComponent = docsRoute.children.find(r => r.path === 'color');

      const docsComponents = docsRoute.children.find(r => r.path === 'components');
      if (!docsComponents || !docsComponents.children) {return routes;}
      const docs = docsComponents.children.filter(r => r.path !== ':slug(.*)*');

      // if language
      const path = docsRoute.path.split('/');
      let language = '';
      if (path.length > 2) {
        language = `/${path[1]}`;
      }

      if (colorComponent) {
        colorComponent.alias = `${language}/color`;
      }


      docs.forEach(doc => {
        const name = doc.path.split('/').pop();
        if (Array.isArray(doc.alias)) {
          doc.alias = [...new Set([...doc.alias, `${language}/${name}`])];
          return;
        }
        doc.alias = [`${language}/${name}`];
      });
    }
    return routes;
  },
};
