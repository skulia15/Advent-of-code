// This solution tries to implement recursion, unsuccessfully - I gave up
import { GetLinesFromInput } from '../common/utils';

const input = GetLinesFromInput()

let directoryStack: string[] = ['/']
const folderSizes: { [key: string]: number } = {};
const folderContains: { [key: string]: string[] } = {};
let answers: { [key: string]: number } = {};

// Keep track of which folders have been visited during the recursion
// to avoid infinite loops
const seenFolders = new Set();

const DoRecursion = (folder: string) => {
    let folderSize = 0;
    folderSize += folderSizes[folder]

    console.log(`Calculating size of folder "${folder}" with size ${folderSize}`);

    const foldersContainedInFolder = folderContains[folder];
    console.log('Subfolders:', foldersContainedInFolder);

    // Return the current folder size if it does not contain any subfolders
    if (!foldersContainedInFolder || foldersContainedInFolder.length === 0) {
        return folderSize;
    }


    // Recurse into each subfolder
    foldersContainedInFolder.map(subfolder => {
        if (!seenFolders.has(subfolder)) {
            seenFolders.add(subfolder);
            // folderSize += DoRecursion(subfolder);
            // Calculate the sizes of all subfolders
            Object.keys(folderContains).map(folder => {
                folderSize = DoRecursion(folder);
                answers[folder] = folderSize
            });
        }
    });

    answers[folder] = folderSize;
    return folderSize;
}

input.map((command, i) => {
    if (command.startsWith("$ cd") && command !== '$ cd ..' ) {
        // Change directory - cd
        if (command === '$ cd /') {
            // Clear directory stack
            directoryStack = ['/']
        }
        else if (command === '$ cd ..') {
            directoryStack.pop()
        }
        else { // Command is enter folder
            const currentFolder = directoryStack[directoryStack.length - 1]
            const folderToEnter = command.split('$ cd ')[1]
            directoryStack.push(folderToEnter)
            if (!folderContains.hasOwnProperty(currentFolder)) {
                folderContains[currentFolder] = [folderToEnter];
            }
            else {
                folderContains[currentFolder].push(folderToEnter);
            }
        }
    }
    else { // listing of contents
        const currentFolder = directoryStack[directoryStack.length - 1];
        if (!command.startsWith('dir')) {
            // listing of file
            const size = parseInt(command.split(' ')[0])
            if (!folderSizes.hasOwnProperty(currentFolder)) {
                folderSizes[currentFolder] = size;
            }
            else {
                folderSizes[currentFolder] = folderSizes[currentFolder] + size;
            }
        }
        else {
            // command starts with dir
            if (!folderSizes.hasOwnProperty(currentFolder)) {
                folderSizes[currentFolder] = 0;
            }
        }
    }
})



// Calculate the sizes of all directories
// Object.keys(folderContains).forEach(folder => {
//     answers[folder] = DoRecursion(folder);
// });

answers['psdz'] = DoRecursion('psdz');

console.log('answers', answers)
// all of the directories with a total size of at most 100000
const answersUnderSize = Object.keys(answers).filter(key => answers[key] < 100000)
console.log('answersUnderSize', answersUnderSize)

let sum = 0
answersUnderSize.map(f => {
    sum += folderSizes[f]
})

console.log('sum of all folders under 100000', sum)
