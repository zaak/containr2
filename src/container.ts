import "reflect-metadata";

export type Constructor<T = any> = new (...args: any[]) => T;
export type Token<T = any> = Constructor<T> | string;

export class Container {
    private registry = new Map<Token, { instance?: any, factory: () => any }>();

    // Register a class or string token with a factory function
    register<T>(token: Token<T>, factory: () => T): void {
        this.registry.set(token, { factory });
    }

    // Resolve an instance by class or string ID
    resolve<T>(token: Token<T>): T {
        const entry = this.registry.get(token);
        if (!entry) {
            throw new Error(`No registration found for ${typeof token === 'string' ? token : token.name}`);
        }

        // Lazy initialization for singleton pattern
        if (!entry.instance) {
            entry.instance = entry.factory();
        }
        return entry.instance;
    }

    // Automatically resolve constructor dependencies and register them
    resolveWithDependencies<T>(token: Constructor<T>): T {
        const paramTypes: Constructor[] = Reflect.getMetadata("design:paramtypes", token) || [];
        const dependencies = paramTypes.map(dep => this.resolve(dep));
        const instance = new token(...dependencies);
        return instance;
    }
}
