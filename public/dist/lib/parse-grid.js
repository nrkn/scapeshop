import { ass } from './util.js';
export const parseGrid = (scapeDocument) => {
    const cornerEls = [...scapeDocument.querySelectorAll('C')];
    const cornerData = cornerEls.map(el => {
        const x = getElAsNumber(el, 'x');
        const y = getElAsNumber(el, 'y');
        const data = { x, y };
        return data;
    });
    return cornerData;
};
const getElAsNumber = (parent, selector) => Number(ass(parent.querySelector(selector)).textContent);
//# sourceMappingURL=parse-grid.js.map