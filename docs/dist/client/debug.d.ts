declare type DebugLevel = 'info' | 'debug' | 'none';
export declare const createDebug: (debugEl: Element) => {
    clear: () => string;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    level: (level?: DebugLevel | undefined) => DebugLevel;
};
export {};
