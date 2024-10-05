import { Container } from '../src/container';

class UserRepository {
    getAllUsers() {
        return ['User1', 'User2', 'User3'];
    }
}

class ProductRepository {
    getAllProducts() {
        return ['Product1', 'Product2'];
    }
}

class AppService {
    constructor(
        private userRepository: UserRepository,
        private productRepository: ProductRepository
    ) {}

    listUsers() {
        return this.userRepository.getAllUsers();
    }

    listProducts() {
        return this.productRepository.getAllProducts();
    }
}

describe('DI Container', () => {
    let container: Container;

    beforeEach(() => {
        container = new Container();
    });

    it('should register and resolve a single instance of a class', () => {
        container.register(UserRepository, () => new UserRepository());

        const userRepository = container.resolve(UserRepository);
        expect(userRepository).toBeInstanceOf(UserRepository);
        expect(userRepository.getAllUsers()).toEqual(['User1', 'User2', 'User3']);
    });

    it('should resolve dependencies of a class using the container', () => {
        container.register(UserRepository, () => new UserRepository());
        container.register(ProductRepository, () => new ProductRepository());
        container.register(AppService, () =>
            new AppService(container.resolve(UserRepository), container.resolve(ProductRepository))
        );

        const appService = container.resolve(AppService);
        expect(appService.listUsers()).toEqual(['User1', 'User2', 'User3']);
        expect(appService.listProducts()).toEqual(['Product1', 'Product2']);
    });

    it('should only instantiate a class once', () => {
        container.register(UserRepository, () => new UserRepository());

        const instance1 = container.resolve(UserRepository);
        const instance2 = container.resolve(UserRepository);

        expect(instance1).toBe(instance2);
    });
});
