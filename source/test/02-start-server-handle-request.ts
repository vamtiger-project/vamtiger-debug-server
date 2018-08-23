import { resolve as resolvePath } from 'path';
import { expect } from 'chai';
import { post } from 'request-promise';
import startServer, { stopServer } from '..';
import mockData, { requireArguments, callbackPath } from './mock-data';

const mockDataPath = resolvePath(
    __dirname,
    'mock-data'
);
const serverParams = {
    port: '8888',
    handleRequest: `${mockDataPath}.handleRequest`
};
const url = `http://localhost:${serverParams.port}/`;

describe('Start server - should return a result', function() {

    before(function () {
        startServer(serverParams);
    });

    after(function () {
        stopServer();
    });

    it('custom request handler', async function () {
        const body = {
            hello: 'world'
        };
        const requestParams = {
            url,
            body: body,
            json: true
        };
        const response = await post(requestParams);
        const { result } = response;

        expect(result).to.be.ok;
        expect(result.message).to.be.true;
    });
})