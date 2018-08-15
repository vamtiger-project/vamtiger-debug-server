# VAMTIGER Debug Server
An HTTP server for debugging.

## Installation
[VAMTIGER Debug Server](https://github.com/vamtiger-project/vamtiger-debug-server) can be installed using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/):
```bash
npm i --save vamtiger-debug-server # local
npm i --global vamtiger-debug-server # global
```
or
```bash
yarn add vamtiger-debug-server # local
yarn global vamtiger-debug-server #global
```

Once installed, [VAMTIGER Debug Server](https://github.com/vamtiger-project/vamtiger-debug-server) can be run as a npm script:
```json
// package.json
// ...
    "scripts": {
        "debug-server": "vamtiger-debug-server --port 8888" // Default port = 8888
    }
// ...
```
Or if install globally, it can be run as a binary executable:
```bash
vamtiger-debug-server --port 8888
```

After starting [VAMTIGER Debug Server](https://github.com/vamtiger-project/vamtiger-debug-server), modules can be debugged via a POST request:
```typescript
import { post } from 'request-promise';
```
or
```javascript
const post = require('request-promise').post;
```

Attributes and methods can be debugged:
```javascript
/* path/to/module.js
module.exports = {
    test: {
        attribute: 'test attribute',
        method: () => {
            return 'test method'
        },
        methodAsync: (param: string, callback: Callback<string>) => {
            callback(null, param)
        },
        sum: (numbers: number[]) => numbers.reduce((sum, number) => sum + number, 0),
        sumAsync: (number1: number, number2: number, callback: Callback<number>) => callback(null, [number1, number2].reduce((sum, number) => sum + number, 0)),
        argument1: 1,
        argument2: 2,
        argument3: 3,
        callback: function (error: Error, result: number) {
            if (error)
                throw error;

            return result;
        }
    }
};
*/

const url = `http://localhost:8888/`;

// attribute
post({
    url,
    body: {
        path: 'path/to/module.test.attribute'
    },
    json: true
});

// method
post({
    url,
    body: {
        path: 'path/to/module.test.method',
        arguments: []
    },
    json: true
});

// method: async
post({
    url,
    body: {
        path: 'path/to/module.test.methodAsync',
        arguments: ['booya kasha!'],
        callback: true
    },
    json: true
});
```

Classes can also be debuged:
```javascript
/* path/to/module.js
export class TestClass {
    private params: Params;

    constructor(params: Params) {
        this.params = params;
    }

    get test() {
        return `params.booya: ${this.params.booya}`;
    }

    sum(...numbers: number[]) {
        return numbers.reduce((sum, number) => sum + number, 0);
    }

    sumAsync(number1: number, number2: number, callback: Callback<number>) {
        callback(null, [number1, number2].reduce((sum, number) => sum + number, 0));
    }
}
*/

// Class - getMethod
post({
    url,
    body: {
        path: `path/to/module.TestClass`,
        instanceAttribute: 'test',
        constructorParams: {
            booya: 'kasha'
        }
    },
    json: true
});

// Class - method
post({
    url,
    body: {
        path: `path/to/module.TestClass`,
        instanceMethod: 'sum',
        constructorParams: {},
        arguments: [1, 2, 3, 4, 5]
    },
    json: true
});

// Class - method: async
post({
    url,
    body: {
        path: `path/to/module.TestClass`,
        instanceMethod: 'sumAsync',
        constructorParams: {},
        arguments: [1, 2],
        callback: true
    },
    json: true
});
```

Arguments can also be dynamically imported:
```javascript
post({
    url,
    body: {
        path: 'path/to/module.test.sum',
        requireArguments: [
            'path/to/module.test.argument1',
            'path/to/module.test.argument2',
            'path/to/module.test.argument3'
        ]
    },
    json: true
}); // 6

post({
    url,
    body: {
        path: 'path/to/module.test.sumAsync',
        requireArguments: [
            'path/to/module.test.argument1',
            'path/to/module.test.argument2',
            'path/to/module.test.callback'
        ]
    },
    json: true
}); // 3
```