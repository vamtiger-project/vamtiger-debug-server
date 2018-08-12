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
        }
    }
};
*/

const url = `http://localhost:8888/`;

// attribute
post({
    url,
    body: JSON.stringify({
        path: 'path/to/module.default.test.attribute'
    })
});

// method
post({
    url,
    body: JSON.stringify({
        path: 'path/to/module.default.test.method',
        arguments: []
    })
});

// method: async
post({
    url,
    body: JSON.stringify({
        path: 'path/to/module.default.test.methodAsync',
        arguments: ['booya kasha!'],
        callback: true
    })
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
    body: JSON.stringify({
        path: `path/to/module.TestClass`,
        instanceGetPath: 'test',
        constructorParams: {
            booya: 'kasha'
        }
    })
});

// Class - method
post({
    url,
    body: JSON.stringify({
        path: `path/to/module.TestClass`,
        instancePath: 'sum',
        constructorParams: {},
        instanceArguments: [1, 2, 3, 4, 5]
    })
});

// Class - method: async
post({
    url,
    body: JSON.stringify({
        path: `path/to/module.TestClass`,
        instancePath: 'sumAsync',
        constructorParams: {},
        instanceArguments: [1, 2],
        callback: true
    })
});
```