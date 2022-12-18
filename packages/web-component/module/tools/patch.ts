/**
 * @description patch templates
 * @author 阿怪
 * @date 2022/12/19 01:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeTemplate } from '@shuimo-design/core';
import { PatchMVNodeTemplate } from '../types/types';

type MProps = MNodeTemplate['props'];
export const patch = (oldNode: MNodeTemplate, newNode: MNodeTemplate) => {
  const res: PatchMVNodeTemplate = {};
  if (oldNode === newNode) {return res;}
  // different type
  if (oldNode.type !== newNode.type) {
    Object.assign(res, newNode);
    return res;
  }

  // same type
  // different props
  if (oldNode.props !== newNode.props) { // this is always true
    res.props = patchProps(oldNode.props, newNode.props);
  }

  // different children
  const oldChildren = oldNode.children;
  if (!oldChildren) {
    res.children = newNode.children;
  } else {
    res.children = {};
    const newChildren = newNode.children;
    for (const key in newChildren) {
      if (oldChildren[key] === newChildren[key]) {
        res.children[key] = patch(oldChildren[key], newChildren[key]);
        continue;
      }
      res.children[key] = newChildren[key];
    }
  }
  return res;
};


const patchProps = (oldProps: MProps | undefined, newProps: MProps | undefined) => {
  if (!oldProps) {return newProps;}
  if (!newProps) {return { remove: Object.keys(oldProps) };}

  const updateProps: MProps = {};
  const removeProps: string[] = [];

  const oldKeys = Object.keys(oldProps);
  const newKeys = Object.keys(newProps);
  const hasComparedKeys = new Set<string>();
  // todo find a faster way to do this
  for (const key of oldKeys) {
    if (newProps[key] === oldProps[key]) {
      hasComparedKeys.add(key);
      continue;
    }
    if (!newKeys.includes(key)) {
      removeProps.push(key);
    }
  }
  for (const key of newKeys) {
    if (hasComparedKeys.has(key)) {continue;}
    updateProps[key] = newProps[key];
  }

  return {
    update: updateProps,
    remove: removeProps
  };
};
