/**
 * @description build document and files
 * @author 阿怪
 * @date 2023/3/2 22:18
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import * as fs from 'fs';
import { renderTemplate, updateFile } from './src/tools/file';
import * as console from 'console';


const PRE = '../../packages';

const mkdir = (path: string) => {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    console.warn('document is created');
  }
};


const getNow = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${year}/${month}/${day} ${hour}:${minute}`;
};


export const build = async (options: { name: string, group: string, author: string, slogan: string }) => {
  const { name, group, author, slogan } = options;
  const upperCaseFirstName = name.replace(name[0], name[0].toUpperCase());
  // darkMode to dark-mode
  const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
  const MName = `M${upperCaseFirstName}`;
  const kName = `m-${kebabName}`;
  const propsName = `${upperCaseFirstName}Props`;
  const now = getNow();
  const common = { author, now, slogan, name };

  const buildCore = async (name: string, group: string) => {
    const corePath = `${PRE}/core/lib/${group}/${name}`;
    mkdir(corePath);

    // useComponent
    renderTemplate(
      'core/hook.tsx',
      `${corePath}/use${upperCaseFirstName}.ts`,
      {
        description: `core ${name} hook`,
        ...common,
        upperCaseFirstName,
        propsName
      });
    // props
    renderTemplate(
      'core/index.d.ts',
      `${corePath}/index.d.ts`,
      {
        ...common,
        kName,
        MName,
        propsName
      }
    );
    // api
    renderTemplate(
      'core/api.ts',
      `${corePath}/api.ts`,
      {
        ...common,
        propsName
      }
    );
    // style
    renderTemplate(
      'core/style.css',
      `${corePath}/${name}.css`,
      {}
    );

  };

  const buildComponent = (options: { version: string, ext: string }) => {
    const { version, ext } = options;
    const filepath = `${PRE}/${version}/lib/${group}`;

    renderTemplate(
      `packages/${version}.tsx`,
      `${filepath}/${MName}.${ext}`,
      {
        hook: `use${upperCaseFirstName}`,
        ...common,
        group,
        MName,
        kName,
        propsName
      }
    );


  };

  await buildCore(name, group);
  await buildComponent({ version: 'lit', ext: 'ts' });
  await buildComponent({ version: 'vue', ext: 'tsx' });
  await buildComponent({ version: 'react', ext: 'tsx' });

  const insertVue = async () => {
    await updateFile({
      path: `${PRE}/vue/index.ts`,
      group,
      list: [{
        checkFn: line => line.trim() === '',
        data: `import ${MName} from './lib/${group}/${MName}';`
      }, {
        checkFn: line => line.trim() === '' || line.trim() === '};',
        data: `  ${MName},`
      }, {
        checkFn: line => line.trim() === '' || line.trim() === '};',
        data: `  ${MName},`
      }]
    });
  };
  const insertCoreStyle = async () => {
    await updateFile({
      path: `${PRE}/core/lib/index.css`,
      group,
      list: [{
        checkFn: line => line.trim() === '',
        data: `@import "${group}/${name}/${name}.css";`
      }]
    });
  };

  const insertWebComponent = async () => {
    await updateFile({
      path: `${PRE}/lit/index.ts`,
      group,
      list: [{
        checkFn: line => line.trim() === '',
        data: `    import('./lib/${group}/${MName}'),`
      }]
    });
  };
  const insertReact = async () => {
    await updateFile({
      path: `${PRE}/react/index.ts`,
      group,
      list: [{
        checkFn: line => line.trim() === '',
        data: `export { default as ${MName} } from './lib/${group}/${MName}';`
      }]
    });
  };

  await insertVue();
  await insertCoreStyle();
  await insertWebComponent();
  await insertReact();


};


