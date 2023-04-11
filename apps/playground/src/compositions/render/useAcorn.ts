/**
 * @description a simple acorn parse hook
 * @author 阿怪
 * @date 2023/4/9 14:20
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import * as acorn from 'acorn';
import { Node } from 'acorn';
import { MError } from '../../plugins/console';

/**
 * Since our business logic does not need to be particularly complicated,
 * this is a very crude way to support ts.
 */
type AcornRoot = Node & {
  body: Node[];
}
type AcornVariableDeclaration = Node & {
  kind: string;
  declarations: AcornIdentifier[];
}
type AcornIdentifier = Node & {
  id: Node & { name: string },
  init: AcornInit
}
type AcornInit = Node & {
  callee: Node & { name: string },
}

const NEED_IMPORT_FROM_VUE = ['ref', 'reactive', 'watch', 'computed'];

export default function useAcorn() {

  const getRoot = (code: string) => {
    const res = acorn.parse(code, { ecmaVersion: 'latest' });
    if (res.type === 'Program') {
      return res as AcornRoot;
    }
    MError('acorn parse error');
  };


  const acornParse = (code: string) => {
    const variableSet = new Set<string>();
    const vueImportSet = new Set<string>();
    const root = getRoot(code)!;
    const body = root.body;

    const handleInit = (init: AcornInit) => {
      if (init.type === 'CallExpression') {
        const { callee } = init;
        if (NEED_IMPORT_FROM_VUE.includes(callee.name) && callee.type === 'Identifier') {
          vueImportSet.add(callee.name);
        } else {
          MError(`unknown init type: ${init}`);
        }
      }
    };

    const initId = (declaration: AcornIdentifier) => {
      const { id, init } = declaration;
      variableSet.add(id.name);
      handleInit(init);
    };
    const getVariableInfo = (node: AcornVariableDeclaration) => {


      const { kind } = node;
      if (kind === 'const' || kind === 'let') {
        const { declarations } = node;
        for (let declaration of declarations) {
          initId(declaration);
        }
        return;
      }
      MError(`unknown variable kind: ${kind}`);
    };

    for (let node of body) {
      if (node.type === 'VariableDeclaration') {
        getVariableInfo(node as AcornVariableDeclaration);
        continue;
      }
      MError(`unknown node type: ${node.type}`);
    }

    return {
      variableList: [...variableSet],
      vueImportList: [...vueImportSet]
    };
  };

  return {
    acornParse
  };

}
