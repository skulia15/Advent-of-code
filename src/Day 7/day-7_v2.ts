// Stolen solution. Had a hard time with this one. https://gitlab.com/fabianolothor/advent-of-code-solutions/-/blob/main/2022/day7.js
// Coded this one to get a good understanding of the solution 

import { GetLinesFromInput } from '../common/utils';

const MAX_FILE_SIZE: number = 100000
let curr = '';
let folders: {
    [key: string]: {
        size: number
    }
} = {};


const input = GetLinesFromInput()

const isCommand = (line: string) => line[0] === '$'

const WalkLines = (lines: string[]) => {
    lines.map(line => {
        if (isCommand(line)) handleCommand(line)
        else handleFileOrFolder(line)
    })
}

const handleCommand = (command: string) => {
    if (!command.startsWith('$ cd ')) {
        // only handle cd commands
        return
    }

    let targetFolder = command.split('$ cd ')[1]

    if (targetFolder === '/') {
        curr = targetFolder
        return
    }
    if (targetFolder === '..') {
        // up folder
        curr = curr
            .split('/')
            .slice(0, curr.split('/').length - 1)
            .join('/') || '/';

        return;
    }

    // change to folder
    curr += (curr === '/' ? '' : '/') + targetFolder;
}

const handleFileOrFolder = (fileOrFolder: string) => {
    if (fileOrFolder.startsWith('dir')) {
        // only handle files
        return
    }

    let fileSize = fileOrFolder.split(' ')[0]

    console.log(curr
        .split('/')
        .reverse())

    curr
        .split('/')
        .reverse()
        .reduce((path, folder) => {
            if (!folders[path]) {
                folders[path] = {
                    size: 0
                };
            }

            folders[path].size += parseInt(fileSize);

            return path.replace(`/${folder}`, '');
        }, curr);

}

WalkLines(input)

let res = Object.keys(folders)
    .filter(folder => folders[folder].size <= MAX_FILE_SIZE)
    .reduce((sum, folder) =>
        sum + folders[folder].size, 0
    )

console.log(res)
