"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultContainer = exports.Container = void 0;
require("reflect-metadata");
var Container = /** @class */ (function () {
    function Container() {
        this.registry = new Map();
    }
    // Register a class or string token with a factory function
    Container.prototype.register = function (token, factory) {
        this.registry.set(token, { factory: factory });
    };
    // Resolve an instance by class or string ID
    Container.prototype.resolve = function (token) {
        var entry = this.registry.get(token);
        if (!entry) {
            throw new Error("No registration found for ".concat(typeof token === 'string' ? token : token.name));
        }
        // Lazy initialization for singleton pattern
        if (!entry.instance) {
            entry.instance = entry.factory();
        }
        return entry.instance;
    };
    // Automatically resolve constructor dependencies and register them
    Container.prototype.resolveWithDependencies = function (token) {
        var _this = this;
        var paramTypes = Reflect.getMetadata("design:paramtypes", token) || [];
        // Resolve dependencies
        var dependencies = paramTypes.map(function (dependency) {
            var resolvedDep = _this.resolve(dependency);
            if (!resolvedDep) {
                throw new Error("No registration found for ".concat(dependency.name));
            }
            return resolvedDep;
        });
        return new (token.bind.apply(token, __spreadArray([void 0], dependencies, false)))();
    };
    return Container;
}());
exports.Container = Container;
// Create a global default container
exports.defaultContainer = new Container();
