const fs = require('fs')
const { argv0 } = require('process')

let data

try {
  data = fs.readFileSync('input.txt', 'utf8')
  console.log('File content:', data)
} catch (err) {
  console.error('Error reading the file:', err)
}

let left = []
let right = []

data.split('\n')
  .forEach((pair) => {
    if (pair) {
      console.log('pair:', pair)
      left.push(pair.split(/\s+/)[0])
      right.push(pair.split(/\s+/)[1])
    }
  }
  )

console.log('sorted left:', left.sort())
console.log('sorted right:', right.sort())

let totalDistance = 0
for (i = 0; i < left.length; i++) {
  totalDistance += Math.abs(left[i] - right[i])
}
console.log(totalDistance)
