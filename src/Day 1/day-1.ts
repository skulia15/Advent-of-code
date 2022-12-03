import { readFileSync } from 'fs';

const result = readFileSync('./puzzle-input.txt', 'utf-8');

const resultSplit = result.split('\r\n\r\n');
const listList = resultSplit.map((x: string) => {
    return x.split('\r\n');
});

const sumArray = listList.map((x) => {
    return x.reduce((partialSum, a) => partialSum + parseInt(a), 0);
});
const sorted = sumArray.sort((a: number, b: number) => a - b).reverse();
console.log('elves carrying the most calories is:', Math.max(...sumArray));
console.log(
    'Sum of top 3 elves is:',
    sorted.slice(0, 3).reduce((partialSum, a) => partialSum + a, 0)
);
