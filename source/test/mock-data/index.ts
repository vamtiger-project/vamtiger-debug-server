export const mockDataPath = __filename.replace('.js', '');

export const requireArguments = [
    'argument1',
    'argument2',
    'argument3'
].map(arg => `${mockDataPath}.default.test.${arg}`);

export const callbackPath = `${mockDataPath}.callback`;

export default {
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
        argument3: 3
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

export function callback(error: Error, result: number) {
    if (error)
        throw error;

    return result;
}

export interface Params {
    [key: string]: any;
}

export type Callback<T> = (error: Error|null, param: T) => void;