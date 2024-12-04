const fs = require('fs')

const data = fs.readFileSync('input.txt', 'utf8')

const reports = data.trim().split('\n')

/**
* Check if levels are safe
* @param levels {number[]} numbers - an array of numbers
* @returns {boolean} whether or not levels are safe
**/
function isSafe(levels) {
  let up
  for (i = 0; i < levels.length - 1; i++) {
    const levelDiff = levels[i + 1] - levels[i]
    if (levelDiff == 0 || Math.abs(levelDiff) > 3) {
      return false
    }
    if (i == 0) {
      up = levelDiff > 0
    }
    if (up != levelDiff > 0) {
      return false
    }
  }
  return true
}

let safeReports = 0
reports.forEach(
  (report) => {
    const levels = report.split(' ')
    console.log('analyzing level:', levels)
    isSafe(levels) && safeReports++

  }
)
console.log('safe report:', safeReports)

