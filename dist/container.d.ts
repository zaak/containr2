import "reflect-metadata";
export type Constructor<T = any> = new (...args: any[]) => T;
export type Token<T = any> = Constructor<T> | string;
export declare class Container {
    private registry;
    register<T>(token: Token<T>, factory: () => T): void;
    resolve<T>(token: Token<T>): T;
    resolveWithDependencies<T>(token: Constructor<T>): T;
}
