/* eslint-disable */
/**
 * @description A tool for normalizing grammatical structures
 * @author 阿怪
 * @date 2023/6/16 11:25
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

import { Ref } from 'vue';

type OptionsEmpty = undefined;


type IsAllUndefined<T extends any[]> = T extends [infer H, ...infer R]
  ? H extends undefined
    ? IsAllUndefined<R>
    : false
  : true;

interface OptionsNotEmpty<P, V, E> {
  props: Required<P>;
  value: { [K in keyof V]: Ref<V[K]>; };
  event: E;
}

type CoreArguments = keyof OptionsNotEmpty<any, any, any>;
type AnyArguments = {
  [K in CoreArguments]?: any
}

type DefinedKeys<T extends AnyArguments> = { [K in keyof T]: T[K] extends undefined ? never : K }[keyof T];
type UndefinedKeys<T extends AnyArguments> = Exclude<keyof CoreArguments, DefinedKeys<T>>;

export type OptionsKeys<
  A extends AnyArguments,
  P, V, E,
  DK extends string | number | symbol = DefinedKeys<A>,
  UK extends string | number | symbol = UndefinedKeys<A>
> = {
  [K in DK & keyof OptionsNotEmpty<P, V, E>]: OptionsNotEmpty<P, V, E>[K];
} & {
  [K in UK & keyof OptionsNotEmpty<P, V, E>]-?: OptionsNotEmpty<P, V, E>[K];
}

export type Options<
  K extends AnyArguments,
  P = K['props'],
  V = K['value'],
  E = K['event'],
> =
  IsAllUndefined<[P, V, E]> extends true
    ? OptionsEmpty
    : OptionsKeys<K, P, V, E>;
