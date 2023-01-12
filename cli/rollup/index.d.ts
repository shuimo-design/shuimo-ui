/**
 * @description
 * @author 阿怪
 * @date 2023/1/11 18:12
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */



export declare type ShuimoBuildConfig = {
  plugins?: ShuimoBuildConfigPlugin,
  external?: string[];
};

export declare type RequiredShuimoBuildConfig = Omit<Required<ShuimoBuildConfig>, 'plugins'> & {
  plugins: Required<ShuimoBuildConfigPlugin>
};

export declare type ShuimoBuildConfigPlugin = {
  resolve?: boolean,
  commonjs?: boolean,
  postcss?: boolean,
  typescript?: ShuimoBuildConfigPluginTypescript
}

export declare type RequiredShuimoBuildConfigPlugin = Omit<Required<ShuimoBuildConfigPlugin>, 'typescript'> & {
  typescript: Required<ShuimoBuildConfigPluginTypescript>;
}

export declare type ShuimoBuildConfigPluginTypescript = {
  filterRoot?: string | boolean,
  tsconfig?: string | boolean,
  include?: string[],
  exclude?: string[]
}
