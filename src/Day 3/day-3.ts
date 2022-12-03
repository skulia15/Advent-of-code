import { readFileSync } from 'fs';

// For clarity
const first: boolean = true;
const second: boolean = false;

const isUpperCase = (d: string): boolean => {
    if (d == d.toUpperCase()) {
        return true;
    }
    return false;
};
const getLetterValue = (c: string): number => {
    if (isUpperCase(c)) return c.charCodeAt(0) - 38;
    return c.charCodeAt(0) - 96;
};

const GetLinesFromInput = () => {
    const result = readFileSync('./puzzle-input.txt', 'utf-8');
    const resultSplit = result.split('\r\n');
    return resultSplit;
};

const getHalfWithUniqueVals = (line: string, firstHalf: boolean) => {
    const half = Math.ceil(line.length / 2);
    return firstHalf
        ? [...new Set(line.slice(0, half))]
        : [...new Set(line.slice(half))];
};

const lines = GetLinesFromInput();
let sum = 0;
lines.map((line, i) => {
    const firstHalf = getHalfWithUniqueVals(line, first);
    const secondHalf = getHalfWithUniqueVals(line, second);
    firstHalf.forEach((el: string) => {
        if (secondHalf.indexOf(el) > -1) {
            console.log('Duplicate', el, getLetterValue(el));
            sum += getLetterValue(el);
        }
    });
});

console.log('Result:', sum);
