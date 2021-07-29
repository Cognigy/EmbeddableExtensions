"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extension_tools_1 = require("@cognigy/extension-tools");
/* import all nodes */
const getRandomCatImage_1 = require("./nodes/getRandomCatImage");
/* import all connections */
exports.default = extension_tools_1.createExtension({
    nodes: [
        getRandomCatImage_1.getRandomCatImage
    ]
});
//# sourceMappingURL=module.js.map