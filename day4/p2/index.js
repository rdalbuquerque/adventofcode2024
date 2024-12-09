const fs = require('fs')
const input = fs.readFileSync('input.txt', 'utf8')

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
 * @param xmasLines {Array<Array<string>>}
 * @returns {boolean}
**/
function findXmas(i, j, xmasLines) {
  let adjs = getAdj(i, j, xmasLines)
  if (adjs.length < 8) {
    return false
  }
  let xmasLetters = ''
  adjs.forEach((adj) => {
    if ((i - adj[0]) == 0 || (j - adj[1]) == 0) {
      return
    }
    xmasLetters += xmasLines[adj[0]][adj[1]]
  })
  // SMMS, SSMM, MMSS, MSSM
  if (['SMMS', 'SSMM', 'MMSS', 'MSSM'].includes(xmasLetters)) {
    return true
  }
  return false
}

let xmasLines = []
let inputLines = input.trim().split('\n')
inputLines.forEach((line) => {
  let xmasCols = []
  for (let j = 0; j < line.length; j++) {
    xmasCols.push(line[j])
  }
  xmasLines.push(xmasCols)
})

xmasCount = 0
for (let i = 0; i < xmasLines.length; i++) {
  for (let j = 0; j < xmasLines[0].length; j++) {
    if (xmasLines[i][j] == 'A') {
      if (findXmas(i, j, xmasLines)) xmasCount++
    }
  }
}

console.log('XMASs:', xmasCount)
