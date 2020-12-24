import {App} from 'vue';

import {default as WInput} from './input';
import {default as WButton} from './button';
import {default as WDialog} from './dialog';
import {default as WTooltip} from './tooltip';
import {default as WScrollNumber} from './scrollNumber';

const components = [
    WInput,
    WButton,
    WDialog,
    WTooltip,
    WScrollNumber
]
const install = function (app: App) {
    components.forEach(component => {
        app.use(component);
    });
    return app;
};

export {WInput, WButton, WDialog, WTooltip, WScrollNumber};

export default {
    install
}
