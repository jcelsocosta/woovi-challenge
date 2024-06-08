"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./aplication/web/server");
function run() {
    (0, server_1.initServerGraphql)();
}
run();
