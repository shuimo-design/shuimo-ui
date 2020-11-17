import { App, Plugin } from 'vue';

export type Key = string | number;

export const withInstall = <T>(comp: T) => {
    const c = comp as any;
    c.install = function (app: App) {
        app.component(c.displayName || c.name, comp);
    };

    return comp as T & Plugin;
};
