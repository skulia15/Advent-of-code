import { readFileSync } from 'fs';

let line1 = ['F', 'G', 'V', 'R', 'J', 'L',].reverse()
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
    console.log('countMoves', countMoves)
    console.log('moveFrom', moveFrom)
    console.log('moveTo', moveTo)

    const moveFromStack = stacks[moveFrom]
    console.log('moveFromStack', moveFromStack)
    const moveToStack = stacks[moveTo]
    console.log('moveToStack', moveToStack)
    for (let index = 0; index < countMoves; index++) {
        const elemToMove = moveFromStack.pop()
        if (elemToMove) {
            moveToStack.push(elemToMove)
        }
    }
    console.log('moved from ', moveFromStack)
    console.log('moved to ', moveToStack)

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
    const firstSplit = command.split('move ')[1]
    const countMoves = parseInt(firstSplit[0])

    const secondSplit = command.split(' from ')[1]
    const moveFrom = parseInt(secondSplit[0]) - 1
    const moveTo = parseInt(secondSplit[5]) - 1

    // console.log(stacks)
    PerformMove(countMoves, moveFrom, moveTo)
    // console.log(stacks)
    i++

})


console.log(stacks)
GetLastElements(stacks)