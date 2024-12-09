const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8')

let xmasLines = []
let inputLines = input.trim().split('\n')
inputLines.forEach((line) => {
  let xmasCols = []
  for (let j = 0; j < line.length; j++) {
    xmasCols.push(line[j])
  }
  xmasLines.push(xmasCols)
})

/**
 * @param i {number}
 * @param j {number}
 * @param xmasLines {Array<Array<string>>}
 * @returns adjIdx {Array<Array<Number>>}
**/
function getAdj(i, j, xmasLines) {
  if (i == 0) {
    if (j == 0) {
      return [[i, j + 1], [i + 1, j + 1], [i + 1, j]]
    }
    if (j == xmasLines[0].length - 1) {
      return [[i + 1, j], [i + 1, j - 1], [i, j - 1]]
    }
    return [[i, j + 1], [i + 1, j + 1], [i + 1, j], [i + 1, j - 1], [i, j - 1]]
  }
  if (i == xmasLines.length - 1) {
    if (j == 0) {
      return [[i, j + 1], [i - 1, j + 1], [i - 1, j]]
    }
    if (j == xmasLines[0].length - 1) {
      return [[i, j - 1], [i - 1, j - 1], [i - 1, j]]
    }
    return [[i, j + 1], [i - 1, j + 1], [i - 1, j], [i - 1, j - 1], [i, j - 1]]
  }
  if (j == 0) {
    return [[i + 1, j], [i + 1, j + 1], [i, j + 1], [i - 1, j + 1], [i - 1, j]]
  }
  if (j == xmasLines[0].length - 1) {
    return [[i + 1, j], [i + 1, j - 1], [i, j - 1], [i - 1, j - 1], [i - 1, j]]
  }
  return [[i, j + 1], [i + 1, j + 1], [i + 1, j], [i + 1, j - 1], [i, j - 1], [i - 1, j - 1], [i - 1, j], [i - 1, j + 1]]
}

/**
 * @param i {number}
 * @param j {number}
 * @param foundLetter {string}
 * @param xmasLines {Array<Array<string>>}
 * @returns {string}
**/
function findXmas(i, j, xmasLines, found, direction) {
  if (found == 'XMAS') {
    xmasCount++
    return 'found'
  }
  let adjs = getAdj(i, j, xmasLines)
  let nextLetter = 'XMAS'['XMAS'.indexOf(found[found.length - 1]) + 1]
  let validDirection = false
  switch (direction) {
    case "right":
      validDirection = adjs.some(el => el[0] == i && el[1] == j + 1)
      if (validDirection && xmasLines[i][j + 1] == nextLetter) {
        found += nextLetter
        return findXmas(i, j + 1, xmasLines, found, "right")
      } else {
        return
      }
    case "left":
      validDirection = adjs.some(el => el[0] == i && el[1] == j - 1)
      if (validDirection && xmasLines[i][j - 1] == nextLetter) {
        found += nextLetter
        return findXmas(i, j - 1, xmasLines, found, "left")
      } else {
        return
      }
    case "down":
      validDirection = adjs.some(el => el[0] == i + 1 && el[1] == j)
      if (validDirection && xmasLines[i + 1][j] == nextLetter) {
        found += nextLetter
        return findXmas(i + 1, j, xmasLines, found, "down")
      } else {
        return
      }
    case "up":
      validDirection = adjs.some(el => el[0] == i - 1 && el[1] == j)
      if (validDirection && xmasLines[i - 1][j] == nextLetter) {
        found += nextLetter
        return findXmas(i - 1, j, xmasLines, found, "up")
      } else {
        return
      }
    case "upperright":
      validDirection = adjs.some(el => el[0] == i - 1 && el[1] == j + 1)
      if (validDirection && xmasLines[i - 1][j + 1] == nextLetter) {
        found += nextLetter
        return findXmas(i - 1, j + 1, xmasLines, found, "upperright")
      } else {
        return
      }
    case "upperleft":
      validDirection = adjs.some(el => el[0] == i - 1 && el[1] == j - 1)
      if (validDirection && xmasLines[i - 1][j - 1] == nextLetter) {
        found += nextLetter
        return findXmas(i - 1, j - 1, xmasLines, found, "upperleft")
      } else {
        return
      }
    case "bottomright":
      validDirection = adjs.some(el => el[0] == i + 1 && el[1] == j + 1)
      if (validDirection && xmasLines[i + 1][j + 1] == nextLetter) {
        found += nextLetter
        return findXmas(i + 1, j + 1, xmasLines, found, "bottomright")
      } else {
        return
      }
    case "bottomleft":
      validDirection = adjs.some(el => el[0] == i + 1 && el[1] == j - 1)
      if (validDirection && xmasLines[i + 1][j - 1] == nextLetter) {
        found += nextLetter
        return findXmas(i + 1, j - 1, xmasLines, found, "bottomleft") == 'found'
      } else {
        return
      }
  }
  if (found == 'X') {
    for (let k = 0; k < adjs.length; k++) {
      if (xmasLines[adjs[k][0]][adjs[k][1]] == nextLetter) {
        const lineDiff = adjs[k][0] - i
        const colDiff = adjs[k][1] - j
        if (lineDiff == 0) {
          if (colDiff == 1) {
            direction = "right"
          } else {
            direction = "left"
          }
        } else if (lineDiff == 1) {
          if (colDiff == 1) {
            direction = "bottomright"
          } else if (colDiff == 0) {
            direction = "down"
          } else if (colDiff == -1) {
            direction = "bottomleft"
          }
        } else if (lineDiff == -1) {
          if (colDiff == 1) {
            direction = "upperright"
          } else if (colDiff == 0) {
            direction = "up"
          } else if (colDiff == -1) {
            direction = "upperleft"
          }
        }
        findXmas(adjs[k][0], adjs[k][1], xmasLines, found + nextLetter, direction)
      }
    }
  }
}

xmasCount = 0
for (let i = 0; i < xmasLines.length; i++) {
  for (let j = 0; j < xmasLines[0].length; j++) {
    if (xmasLines[i][j] == 'X') {
      findXmas(i, j, xmasLines, 'X', '')
    }
  }
}

console.log('XMASs:', xmasCount)
