export default {
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

export interface Params {
    [key: string]: any;
}

export type Callback<T> = (error: Error|null, param: T) => void;