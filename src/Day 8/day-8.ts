import { GetLinesFromInput } from '../common/utils';

let countVisible = 0

const input = GetLinesFromInput()

for (let i = 0; i < input.length; i++) {
  if (i === 0 || i === input.length - 1) {
    // this is the first or last line
    countVisible += input[i].length
    continue;
  }

  // Not first or last line
  const currentLine = Array.from(String(input[i])).map(str => Number(str));

  for (let j = 0; j < currentLine.length; j++) {
    const treeSize = currentLine[j];
    if (j === 0 || j === currentLine.length - 1) {
      // edge - first or last letter of line
      countVisible++
      continue;
    }
    // check left
    let endVisibilityCheck = false
    let walkLeftIndex = j - 1
    while (walkLeftIndex >= 0) {
      if (treeSize > currentLine[walkLeftIndex]) {
        console.log(currentLine[j] + ' visible from left, because ' + currentLine[j] + ' > ' + currentLine[walkLeftIndex])
      }
      else {
        console.log(currentLine[j] + ' visible IS NOT VISIBLE FROM left, because ' + currentLine[j] + ' <= ' + currentLine[walkLeftIndex])
        break;
      }
      if (walkLeftIndex === 0) {
        console.log('edge reached - visible from left')
        endVisibilityCheck = true
        countVisible++
        break
      }
      walkLeftIndex--
    }

    if (endVisibilityCheck) {
      continue
    }
    
    // check right
    let walkRightIndex = j + 1
    while (walkRightIndex < currentLine.length) {
      if (treeSize > currentLine[walkRightIndex]) {
        console.log(currentLine[j] + ' visible from right, because ' + currentLine[j] + ' > ' + currentLine[walkRightIndex])
      }
      else {
        console.log(currentLine[j] + ' visible IS NOT VISIBLE FROM right, because ' + currentLine[j] + ' <= ' + currentLine[walkRightIndex])
        break;
      }
      if (walkRightIndex === currentLine.length - 1) {
        console.log('edge reached - visible from right')
        endVisibilityCheck = true
        countVisible++
        break
      }
      walkRightIndex++
    }

    if (endVisibilityCheck) {
      continue
    }

    let walkTopIndex = i - 1

    // check top
    while (walkTopIndex >= 0) {
      const prevLine = Array.from(String(input[walkTopIndex])).map(str => Number(str));
      if (treeSize > prevLine[j]) {
        console.log(currentLine[j] + ' visible from top, because ' + currentLine[j] + ' > ' + prevLine[j])
      }
      else {
        console.log(currentLine[j] + ' visible IS NOT VISIBLE FROM top, because ' + currentLine[j] + ' <= ' + prevLine[j])
        break;
      }
      if (walkTopIndex === 0) {
        console.log('edge reached - visible from top')
        endVisibilityCheck = true
        countVisible++
        break
      }
      walkTopIndex--
    }

    if (endVisibilityCheck) {
      continue
    }

    // check bottom
    let walkBottomIndex = i + 1

    while (walkBottomIndex < input.length) {
      const nextLine = Array.from(String(input[walkBottomIndex])).map(str => Number(str));
      if (treeSize > nextLine[j]) {
        console.log(currentLine[j] + ' visible from bottom, because ' + currentLine[j] + ' > ' + nextLine[j])
      }
      else {
        console.log(currentLine[j] + ' visible IS NOT VISIBLE FROM bottom, because ' + currentLine[j] + ' <= ' + nextLine[j])
        break;
      }
      if (walkBottomIndex === input.length - 1) {
        console.log('edge reached - visible from bottom')
        endVisibilityCheck = true
        countVisible++
        break
      }
      walkBottomIndex++
    }
    if (endVisibilityCheck) {
      continue
    }

    console.log(currentLine[j] + ' is NOT visible')

  }
}
console.log('Number of visible trees is:', countVisible)
