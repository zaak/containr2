"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = Injectable;
var container_1 = require("./container");
function Injectable(containerOrConstructor) {
    // Case 1: @Injectable used without parentheses (directly on the class)
    if (typeof containerOrConstructor === 'function') {
        var constructor_1 = containerOrConstructor;
        container_1.defaultContainer.register(constructor_1, function () { return container_1.defaultContainer.resolveWithDependencies(constructor_1); });
        return;
    }
    // Case 2: @Injectable used with parentheses (passing a custom container)
    var container = containerOrConstructor || container_1.defaultContainer;
    return function (constructor) {
        container.register(constructor, function () { return container.resolveWithDependencies(constructor); });
    };
}
