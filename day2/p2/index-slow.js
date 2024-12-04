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
  for (let i = 0; i < levels.length - 1; i++) {
    const levelDiff = levels[i + 1] - levels[i]
    if (levelDiff == 0 || Math.abs(levelDiff) > 3) {
      return false
    }
    if (i == 0) {
      up = levelDiff > 0
    } else if (up != levelDiff > 0) {
      return false
    }
  }
  return true
}

let safeReports = 0
reports.forEach(
  (report) => {
    const levels = report.split(' ')
    for (let i = 0; i < levels.length; i++) {
      const levelsWithoutCurrentIndex = levels.slice(0, i).concat(levels.slice(i + 1))
      if (isSafe(levelsWithoutCurrentIndex)) {
        safeReports++
        break
      }
    }
  }
)
console.log('safe reports:', safeReports)

