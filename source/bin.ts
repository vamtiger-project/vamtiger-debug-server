#!/usr/bin/env node
import Args = require('vamtiger-argv');
import startServer, { CommandlineArgs } from '.';

const args = new Args();
const defaults = {
    port: 8888,
    handleRequest: ''
};
const port = args.has(CommandlineArgs.port) && args.get(CommandlineArgs.port) || defaults.port;
const handleRequest = args.has(CommandlineArgs.handleRequest) && args.get(CommandlineArgs.handleRequest) || defaults.handleRequest;

try {
    startServer({
        port,
        handleRequest
    });
} catch(error) {
    console.error(error);
    process.exit();
}