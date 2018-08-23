/// <reference types="node" />
import { Server, IncomingMessage } from 'http';
import { Params as RequireParams } from 'vamtiger-require';
export default function vamtigerDebugServer({ port, handleRequest: handleRequestPath }: Params): Server;
export declare function stopServer(): void;
export declare function getBody({ request }: GetBodyParams): Promise<AnyObject>;
export interface Params {
    port: string | number;
    handleRequest?: string;
}
export interface GetBodyParams {
    request: IncomingMessage;
}
export interface Body extends RequireParams {
    callback?: boolean;
    instanceGetPath?: string;
}
export interface AnyObject {
    [key: string]: any;
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
    port = "port",
    handleRequest = "handleRequest"
}
export declare type VamtigerDebugServer = typeof vamtigerDebugServer;
