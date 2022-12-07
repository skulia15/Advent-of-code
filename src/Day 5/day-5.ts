import { readFileSync } from 'fs';

let line1 = ['F', 'G', 'V', 'R', 'J', 'L', 'D'].reverse()
let line2 = ['S', 'J', 'H', 'V', 'B', 'M', 'P', 'T'].reverse()
let line3 = ['C', 'P', 'G', 'D', 'F', 'M', 'H', 'V'].reverse()
let line4 = ['Q', 'G', 'N', 'P', 'D', 'M'].reverse()
let line5 = ['F', 'N', 'H', 'L', 'J'].reverse()
let line6 = ['Z', 'T', 'G', 'D', 'Q', 'V', 'F', 'N'].reverse()
let line7 = ['L', 'B', 'D', 'F'].reverse()
let line8 = ['N', 'D', 'V', 'S', 'B', 'J', 'M'].reverse()
let line9 = ['D', 'L', 'G'].reverse()
let stacks = [line1, line2, line3, line4, line5, line6, line7, line8, line9]

const GetLinesFromInput = () => {
    const result = readFileSync('./puzzle-input.txt', 'utf-8');
    const resultSplit = result.split('\r\n');
    return resultSplit;
};

const GetMoveCommands = (input: string[]) => {
    return input.filter(x => x.startsWith('move'))
}

const PerformMove = (countMoves: number, moveFrom: number, moveTo: number) => {
    const moveFromStack = stacks[moveFrom]
    const moveToStack = stacks[moveTo]
    for (let index = 0; index < countMoves; index++) {
        const elemToMove = moveFromStack.pop()
        if (elemToMove) {
            moveToStack.push(elemToMove)
        }
    }
}


const GetLastElements = (myList: string[][]) => {
    // Iterate over the list of arrays
    for (var i = 0; i < myList.length; i++) {
        // Get the last element in the current array
        var lastElement = myList[i][myList[i].length - 1];

        // Print the last element to the console
        console.log(lastElement);
    }
}

const lines = GetLinesFromInput()
const moveCommands = GetMoveCommands(lines)

let i = 0
moveCommands.map(command => {
    let [move, countMoves, from, moveFrom, to, moveTo] = command.split(' ');
    PerformMove(+countMoves, +moveFrom-1, +moveTo-1)
    i++
})


console.log(stacks)
GetLastElements(stacks)