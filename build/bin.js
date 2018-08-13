#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Args = require("vamtiger-argv");
const _1 = require(".");
const args = new Args();
const defaults = {
    port: 8888
};
const port = args.has(_1.CommandlineArgs.port) && args.get(_1.CommandlineArgs.port) || defaults.port;
try {
    _1.default({ port });
}
catch (error) {
    console.error(error);
    process.exit();
}
//# sourceMappingURL=bin.js.map