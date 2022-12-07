import { readFileSync } from 'fs';

const GetInput = () => {
    return readFileSync('./puzzle-input.txt', 'utf-8');
};

const input = GetInput().split('')

for (let i = 4; i < input.length; i++) {
    const four = input.slice(i - 4, i)
    
    if (new Set(four).size === four.length) {
        console.log('Answer', i)
        break;
    }
}
