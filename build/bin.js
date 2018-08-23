#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Args = require("vamtiger-argv");
const _1 = require(".");
const args = new Args();
const defaults = {
    port: 8888,
    handleRequest: ''
};
const port = args.has(_1.CommandlineArgs.port) && args.get(_1.CommandlineArgs.port) || defaults.port;
const handleRequest = args.has(_1.CommandlineArgs.handleRequest) && args.get(_1.CommandlineArgs.handleRequest) || defaults.handleRequest;
try {
    _1.default({
        port,
        handleRequest
    });
}
catch (error) {
    console.error(error);
    process.exit();
}
//# sourceMappingURL=bin.js.map