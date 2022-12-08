import { readFileSync } from 'fs';
import { GetLinesFromInput } from '../common/utils';

const input = GetLinesFromInput(true)

let directoryStack: string[] = ['/']
const folderSizes: { [key: string]: number } = {};

input.map((command, i) => {
    if (command.startsWith("$")) {
        // Change directory - cd
        if (command.startsWith("$ cd ")) {
            if (command === '$ cd /') {
                // Clear directory stack
                directoryStack = ['/']
            }
            else if (command === '$ cd ..') {
                directoryStack.pop()
            }
            else { // Command is enter folder
                directoryStack.push(command.split('$ cd ')[1])
            }
        }
        // List directory - ls
        if (command == ("$ ls")) {

        }
    }
    else { // listing of contents
        if (command.startsWith('dir')) {
            // listing of directory // TODO:
        }
        else {
            // listing of file
            const size = parseInt(command.split(' ')[0])
            const currentFolder = directoryStack[directoryStack.length - 1];
            if (!folderSizes.hasOwnProperty(currentFolder)) {
                folderSizes[currentFolder] = size;
                console.log('create entry ' + currentFolder + " of size " + size)
                
            }
            else {
                folderSizes[currentFolder] = folderSizes[currentFolder] + size;
                console.log('adding to entry ' + currentFolder + " size is no " + size)
                
            }
        }
    }

})
// TODO: Handle folders that contain folders
console.log(folderSizes)
