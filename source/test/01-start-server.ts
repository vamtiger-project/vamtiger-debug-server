import { resolve as resolvePath } from 'path';
import { expect } from 'chai';
import { post } from 'request-promise';
import startServer, { stopServer } from '..';
import mockData from './mock-data';

const url = `http://localhost:8888/`;
const serverParams = {
    port: '8888'
};
const mockDataPath = resolvePath(
    __dirname,
    'mock-data'
);

describe('Start server - should return a result', function() {

    before(function () {
        startServer(serverParams);
    });

    after(function () {
        stopServer();
    });

    it('attribute', async function () {
        const body = {
            path: `${mockDataPath}.default.test.attribute`
        };
        const requestParams = {
            url,
            body: body,
            json: true
        };
        const response = await post(requestParams);
        const { result } = response;
        const expected = mockData.test.attribute;

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('method', async function () {
        const body = {
            path: `${mockDataPath}.default.test.method`,
            arguments: []
        };
        const requestParams = {
            url,
            body: body,
            json: true
        };
        const response = await post(requestParams);
        const { result } = response;
        const expected = mockData.test.method();

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('method - async', async function () {
        const body = {
            path: `${mockDataPath}.default.test.methodAsync`,
            arguments: ['booya kasha!'],
            callback: true
        };
        const requestParams = {
            url,
            body: body,
            json: true
        };
        const response = await post(requestParams);
        const { result } = response;
        const expected = 'booya kasha!';

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('Constructor - attribute', async function () {
        const body = {
            path: `${mockDataPath}.TestClass`,
            instanceGetPath: 'test',
            constructorParams: {
                booya: 'kasha'
            }
        };
        const requestParams = {
            url,
            body: body,
            json: true
        };
        const response = await post(requestParams);
        const { result } = response;
        const expected = 'params.booya: kasha';

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('Constructor - method', async function () {
        const body = {
            path: `${mockDataPath}.TestClass`,
            instancePath: 'sum',
            constructorParams: {},
            instanceArguments: [1, 2, 3, 4, 5]
        };
        const requestParams = {
            url,
            body: body,
            json: true
        };
        const response = await post(requestParams);
        const { result } = response;
        const expected = 15;

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });

    it('Constructor - method: async', async function () {
        const body = {
            path: `${mockDataPath}.TestClass`,
            instancePath: 'sumAsync',
            constructorParams: {},
            instanceArguments: [1, 2],
            callback: true
        };
        const requestParams = {
            url,
            body: body,
            json: true
        };
        const response = await post(requestParams);
        const { result } = response;
        const expected = 3;

        expect(result).to.be.ok;
        expect(result).to.equal(expected);
    });
})