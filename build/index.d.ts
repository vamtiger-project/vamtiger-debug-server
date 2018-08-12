/// <reference types="node" />
import { Server, IncomingMessage } from 'http';
import { Params as RequireParams } from 'vamtiger-require';
export interface Params {
    port: string | number;
}
export interface GetBodyParams {
    request: IncomingMessage;
}
export interface Body extends RequireParams {
    callback?: boolean;
    instanceGetPath?: string;
}
export declare enum Event {
    data = "data",
    end = "end"
}
export declare enum HeaderKey {
    contentType = "Content-Type"
}
export declare enum HeaderValue {
    json = "application/json"
}
export declare enum CommandlineArgs {
    port = "port"
}
export declare type VamtigerDebugServer = typeof vamtigerDebugServer;
export default function vamtigerDebugServer({ port }: Params): Server;
export declare function stopServer(): void;
