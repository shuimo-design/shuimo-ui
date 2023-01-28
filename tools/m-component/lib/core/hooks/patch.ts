/**
 * @description patch templates
 * @author 阿怪
 * @date 2022/12/19 01:06
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { MNodeSlot, MNodeTemplate, PatchMVNodeTemplate } from '../../../types/template/template';
import { getSlot } from './tools';
import isEqual from 'lodash-es/isEqual';
import { isEmpty } from 'lodash-es';


type MProps = MNodeTemplate['props'];
export const patch = (oldNode: MNodeTemplate, newNode: MNodeTemplate) => {
  if (isEmpty(oldNode) && !isEmpty(newNode)) {
    // copy is a better way
    return {
      if: true,
      show: true,
      type: newNode.type,
      props: { update: newNode.props },
      children: newNode.children,
      slots: { add: getSlot(newNode.slots) },
      innerText: newNode.innerText
    } as PatchMVNodeTemplate;
  }

  const res: PatchMVNodeTemplate = {};
  if (isEqual(oldNode, newNode)) {return res;}

  // different type
  if (oldNode.type !== newNode.type) {
    Object.assign(res, newNode);
    return res;
  }

  // same type
  // different props
  if (!isEqual(oldNode.props, newNode.props)) {
    res.props = patchProps(oldNode.props, newNode.props);
  }

  // different children
  const oldChildren = oldNode.children;
  // todo fix object no index error
  if (!oldChildren) {
    // @ts-ignore  fix type error
    res.children = newNode.children;
  } else {
    res.children = {};
    const newChildren = newNode.children;
    for (const key in newChildren) {
      if (!isEqual(oldChildren[key], newChildren[key])) {
        res.children[key] = patch(oldChildren[key], newChildren[key]);
      }
    }
    if (newChildren) {
      for (const key in oldChildren) {
        if (!newChildren[key]) {
          if (!res.removeChildren) res.removeChildren = [];
          res.removeChildren?.push(oldChildren[key]);
        }
      }
    }
  }

  // different slots
  if (!isEqual(oldNode.slots, newNode.slots)) {
    const { add, remove, update } = patchSlots(oldNode.slots, newNode.slots);
    res.slots = { add, remove, update };
  }

  // diff innerText
  if (!isEqual(oldNode.innerText, newNode.innerText)) {
    res.innerText = newNode.innerText;
  }

  if (oldNode.if !== newNode.if) {res.if = newNode.if;}
  if (oldNode.show !== newNode.show) {res.show = newNode.show;}

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


const patchSlots = (oldSlots: MNodeTemplate['slots'], newSlots: MNodeTemplate['slots']) => {
  const oldSlotsMap = getSlot(oldSlots), newSlotsMap = getSlot(newSlots);
  let add: Map<string, MNodeSlot> | undefined,
    remove: Map<string, MNodeSlot> | undefined,
    update: Map<string, MNodeSlot> | undefined;
  if (!newSlots?.size) {
    remove = oldSlotsMap;
  } else if (!oldSlots?.size) {
    add = newSlotsMap;
  } else {
    for (const [key, value] of newSlotsMap) {
      if (oldSlotsMap.has(key)) {
        if (!isEqual(oldSlotsMap.get(key), newSlotsMap.get(key))) {
          update = update || new Map<string, MNodeSlot>();
          update.set(key, value);
        }
      } else {
        add = add || new Map<string, MNodeSlot>();
        add.set(key, value);
      }
    }
    for (const [key, value] of oldSlotsMap) {
      if (!newSlotsMap.has(key)) {
        remove = remove || new Map<string, MNodeSlot>();
        remove.set(key, value);
      }
    }
  }
  return { add, remove, update };
};
