import { Injectable } from '../src/decorators';
import {Container, defaultContainer} from "../src";

let container: Container;

describe('@Injectable Decorator', () => {
    beforeEach(() => {
        container = new Container();
    });

    it('should register the class in the container', () => {
        @Injectable(container)
        class UserRepository {
            getAllUsers() {
                return ['User1', 'User2'];
            }
        }

        @Injectable(container)
        class ProductRepository {
            getAllProducts() {
                return ['Product1', 'Product2'];
            }
        }

        @Injectable(container)
        class AppService {
            constructor(
                public userRepository: UserRepository,
                public productRepository: ProductRepository
            ) {}
        }

        // Test that the AppService class is registered by the @Injectable decorator
        const appService = container.resolve(AppService);
        expect(appService).toBeInstanceOf(AppService);
    });

    it('should resolve dependencies automatically', () => {
        @Injectable(container)
        class UserRepository {
            getAllUsers() {
                return ['User1', 'User2'];
            }
        }

        @Injectable(container)
        class ProductRepository {
            getAllProducts() {
                return ['Product1', 'Product2'];
            }
        }

        @Injectable(container)
        class AppService {
            constructor(
                public userRepository: UserRepository,
                public productRepository: ProductRepository
            ) {}
        }

        // Test that AppService's dependencies (UserRepository and ProductRepository) are resolved
        const appService = container.resolve(AppService);

        expect(appService.userRepository).toBeInstanceOf(UserRepository);
        expect(appService.productRepository).toBeInstanceOf(ProductRepository);
        expect(appService.userRepository.getAllUsers()).toEqual(['User1', 'User2']);
        expect(appService.productRepository.getAllProducts()).toEqual(['Product1', 'Product2']);
    });

    it('should throw an error when dependencies are not registered', () => {
        @Injectable
        class UserRepository {
            getAllUsers() {
                return ['User1', 'User2'];
            }
        }

        // @Injectable(container) - intentionally omitted
        class ProductRepository {
            getAllProducts() {
                return ['Product1', 'Product2'];
            }
        }

        @Injectable
        class AppService {
            constructor(
                public userRepository: UserRepository,
                public productRepository: ProductRepository
            ) {}
        }

        expect(() => defaultContainer.resolve(AppService)).toThrow(
            'No registration found for ProductRepository'
        );
    });
});
