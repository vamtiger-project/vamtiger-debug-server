import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import vamtigerRequire, { Params as RequireParams } from 'vamtiger-require';
import { ReferenceObjectPath } from 'vamtiger-reference-object-path';
import Argv = require('vamtiger-argv');

export interface Params {
    port: string | number;
}

export interface GetBodyParams {
    request: IncomingMessage
}

export interface Body extends RequireParams {
    callback?: boolean;
    instanceGetPath?: string;
}

export enum Event {
    data = 'data',
    end = 'end'
}

export enum HeaderKey {
    contentType = 'Content-Type'
}

export enum HeaderValue {
    json = 'application/json'
}

export enum CommandlineArgs {
    port = 'port'
}

export type VamtigerDebugServer = typeof vamtigerDebugServer;

const Args = require('vamtiger-argv') as typeof Argv;
const referenceObjectPath = require('vamtiger-reference-object-path') as ReferenceObjectPath;
const args = new Args();
const defaults = {
    port: 8888
}

const port = args.has(CommandlineArgs.port) && args.get(CommandlineArgs.port) || defaults.port;

if (port)
    vamtigerDebugServer({ port });

let server: Server;

export default function vamtigerDebugServer({ port }: Params) {
    server = !server ? createServer(handleRequest) : server;

    server.listen(port);

    return server;
}

export function stopServer() {
    server.close();
}

async function handleRequest(request: IncomingMessage, response: ServerResponse) {
    const body = await getBody({ request });
    const callback = (error: Error, result: any) => response.end(JSON.stringify({ error, result }));

    let result;

    response.setHeader(HeaderKey.contentType, HeaderValue.json);

    try {
        if (body.callback) {
            body.arguments && body.arguments.push(callback);
            body.instanceArguments && body.instanceArguments.push(callback);

            result = vamtigerRequire(body);
        } else {
            result = vamtigerRequire(body);

            if (body.instanceGetPath)
                result = referenceObjectPath({
                    object: result,
                    path: body.instanceGetPath
                });

            response.end(JSON.stringify({ result }));
        }
    } catch(error){
        console.error(error);

        response.end(JSON.stringify({ error }));
    };
}

function getBody({ request }: GetBodyParams): Promise<Body> {
    const body = [] as Uint8Array[];

    return new Promise(resolve => {
        request.on(
            Event.data,
            chuck => body.push(chuck)
        );
        request.on(
            Event.end,
            () => Promise
                .resolve(Buffer.concat(body).toString())
                .then(JSON.parse)
                .then(resolve)
        )
    })
}