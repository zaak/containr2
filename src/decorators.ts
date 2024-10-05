import { Container, defaultContainer } from './container';


// Define a class constructor type
type ClassConstructor<T> = new (...args: any[]) => T;

export function Injectable<T>(containerOrConstructor?: Container | ClassConstructor<T>): any {
    // Case 1: @Injectable used without parentheses (directly on the class)
    if (typeof containerOrConstructor === 'function') {
        const constructor = containerOrConstructor as ClassConstructor<T>;
        defaultContainer.register(constructor, () => defaultContainer.resolveWithDependencies(constructor));
        return;
    }

    // Case 2: @Injectable used with parentheses (passing a custom container)
    const container = containerOrConstructor || defaultContainer;

    return function (constructor: ClassConstructor<T>) {
        container.register(constructor, () => container.resolveWithDependencies(constructor));
    };
}
