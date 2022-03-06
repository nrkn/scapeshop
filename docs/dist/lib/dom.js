import { ass } from './util.js';
export const hArgs = (el, ...args) => {
    for (const arg of args) {
        if (typeof arg === 'string')
            el.append(arg);
        else if (typeof arg === 'number')
            el.append(String(arg));
        else if (Array.isArray(arg))
            el.append(arg.join(' '));
        else if ('nodeType' in arg)
            el.append(arg);
        else {
            for (const key in arg) {
                let value = arg[key];
                if (Array.isArray(value))
                    value = value.join(' ');
                if (typeof value !== 'string')
                    value = String(value);
                if (value === false)
                    continue;
                if (value === true)
                    value = '';
                el.setAttribute(key, value);
            }
        }
    }
    return el;
};
export const H = (name, ...args) => {
    const el = document.createElement(name);
    hArgs(el, ...args);
    return el;
};
export const S = (name, ...args) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    hArgs(el, ...args);
    return el;
};
export const createX = (document) => (name, ...args) => {
    const el = document.createElement(name);
    hArgs(el, ...args);
    return el;
};
export const Q = (parent) => {
    const q = (selector) => ass(parent.querySelector(selector));
    return q;
};
export const populate = (parent, ...args) => {
    const tt = parent.querySelectorAll('t-t');
    for (let i = 0; i < tt.length; i++) {
        const el = tt[i];
        const value = args[i];
        if (!value)
            break;
        el.innerHTML = String(value);
    }
};
//# sourceMappingURL=dom.js.map