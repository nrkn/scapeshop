export declare const hArgs: <T extends Element>(el: T, ...args: any[]) => T;
export declare const H: <K extends keyof HTMLElementTagNameMap>(name: K, ...args: any[]) => HTMLElementTagNameMap[K];
export declare const S: <K extends keyof SVGElementTagNameMap>(name: K, ...args: any[]) => SVGElementTagNameMap[K];
export declare const createX: (document: Document) => (name: string, ...args: any[]) => HTMLElement;
declare type QFn = {
    <K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K];
    <K extends keyof HTMLElementTagNameMap>(selector: string): HTMLElementTagNameMap[K];
    <T extends Element = Element>(selector: string): T;
};
export declare const Q: (parent: ParentNode) => QFn;
export declare const populate: (parent: ParentNode, ...args: any[]) => void;
export {};
