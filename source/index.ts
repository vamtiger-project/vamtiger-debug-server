import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import vamtigerRequire, { Params as RequireParams } from 'vamtiger-require';
import { ReferenceObjectPath } from 'vamtiger-reference-object-path';
import Argv = require('vamtiger-argv');

const referenceObjectPath = require('vamtiger-reference-object-path') as ReferenceObjectPath;

let server: Server | undefined;

export default function vamtigerDebugServer({ port, handleRequest: handleRequestPath }: Params) {
    const handleRequestModule = handleRequestPath && vamtigerRequire({
        path: handleRequestPath
    }) as typeof handleRequest;

    server = !server ? createServer(handleRequestModule || handleRequest) : server;

    server.listen(port);

    return server;
}

export function stopServer() {
    if (server)
        server.close();

    server = undefined;
}

async function handleRequest(request: IncomingMessage, response: ServerResponse) {
    const body = await getBody({ request }) as Body;
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

export function getBody({ request }: GetBodyParams): Promise<AnyObject> {
    const body = [] as Uint8Array[];

    return new Promise(resolve => {
        request.on(
            Event.data,
            chunk => body.push(chunk)
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

export interface Params {
    port: string | number;
    handleRequest?: string;
}

export interface GetBodyParams {
    request: IncomingMessage
}

export interface Body extends RequireParams {
    callback?: boolean;
    instanceGetPath?: string;
}

export interface AnyObject {
    [key: string]: any;
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
    port = 'port',
    handleRequest = 'handleRequest'
}

export type VamtigerDebugServer = typeof vamtigerDebugServer;