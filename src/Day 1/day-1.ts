import { readFileSync } from 'fs';

const result = readFileSync('./puzzle-input.txt', 'utf-8');

const resultSplit = result.split('\r\n\r\n');
const listList = resultSplit.map((x: string) => {
    return x.split('\r\n');
});

const sumArray = listList.map((x) => {
    return x.reduce((partialSum, a) => partialSum + parseInt(a), 0);
});
console.log(Math.max(...sumArray));
