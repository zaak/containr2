"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
exports.Injectable = Injectable;
var container_1 = require("./container");
exports.container = new container_1.Container();
// Injectable decorator to register classes
function Injectable(target) {
    exports.container.register(target, function () { return exports.container.resolveWithDependencies(target); });
}
