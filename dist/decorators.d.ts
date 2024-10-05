import { Constructor, Container } from './container';
export declare const container: Container;
export declare function Injectable<T extends Constructor>(target: T): void;
