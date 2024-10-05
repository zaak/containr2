import { Constructor, Container } from './container';

export const container = new Container();

// Injectable decorator to register classes
export function Injectable<T extends Constructor>(target: T) {
    container.register(target, () => container.resolveWithDependencies(target));
}
