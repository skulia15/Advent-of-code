import { readFileSync } from 'fs';

const GetLinesFromInput = () => {
    const result = readFileSync('./puzzle-input.txt', 'utf-8');
    const resultSplit = result.split('\r\n');
    return resultSplit;
};

const GetLengthOfSection = (section: string): number => {
    const p = section.split('-')
    return parseInt(p[1]) - parseInt(p[0])
}

const getFullList = (range: string): number[] => {
    const p = range.split('-')
    let res : number[] = []
    for (let index = parseInt(p[0]); index <= parseInt(p[1]); index++) {
        res.push(index)
    }
    return res
} 
const ListFullyContains = (container : number[], containee : number[]) => containee.every(section => container.includes(section));

let countFullyContains: number = 0

GetLinesFromInput().map(line => {
    const lineSplit = line.split(',')
    const firstSection = lineSplit[0]
    const secondSection = lineSplit[1]

    const lenFirst = GetLengthOfSection(firstSection)
    const lenSecond = GetLengthOfSection(secondSection)

    const firstNumberList = getFullList(firstSection)
    const secondNumberList = getFullList(secondSection)

    if (lenFirst == lenSecond) {
        if (firstSection == secondSection) {
            countFullyContains++
            console.log('Contain because sections are the same')
        }
        else {
            console.log('No contain')
        }
    }
    else if (lenFirst > lenSecond) {
        if (ListFullyContains(firstNumberList, secondNumberList)) {
            countFullyContains++
            console.log('First Contains second')
        }
        else {
            console.log('No contain')
        }
    }
    else {
        if(ListFullyContains(secondNumberList, firstNumberList)){
            countFullyContains++
            console.log('Second Contains first')
        }
        else {
            console.log('No contain')
        }
    }
})

console.log('Assignment pairs where doe one range fully contains the other:', countFullyContains)
