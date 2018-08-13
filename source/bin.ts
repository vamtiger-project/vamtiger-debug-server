#!/usr/bin/env node
import Args = require('vamtiger-argv');
import startServer, { CommandlineArgs } from '.';

const args = new Args();
const defaults = {
    port: 8888
};
const port = args.has(CommandlineArgs.port) && args.get(CommandlineArgs.port) || defaults.port;

try {
    startServer({ port });
} catch(error) {
    console.error(error);
    process.exit();
}