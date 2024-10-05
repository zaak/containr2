import { Container } from './container';
type ClassConstructor<T> = new (...args: any[]) => T;
export declare function Injectable<T>(containerOrConstructor?: Container | ClassConstructor<T>): any;
export {};
