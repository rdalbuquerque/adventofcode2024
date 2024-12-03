const fs = require('fs')

const data = fs.readFileSync('input.txt', 'utf8')

let left = []
let right = []

data.trim().split('\n').forEach(
  (pair) => {
    const [l, r] = pair.split(/\s+/).map(Number)
    left.push(l)
    right.push(r)
  }
)

let rightMap = {}
right.forEach((n) => {
  const occurences = rightMap[n]
  if (!occurences) {
    rightMap[n] = 1
  } else {
    rightMap[n] = occurences + 1
  }
})

let similarityScore = 0
left.forEach((n) => {
  const nRightOccurences = rightMap[n] || 0
  const nSimilarityScore = n * nRightOccurences
  similarityScore += nSimilarityScore
})

console.log(similarityScore)
