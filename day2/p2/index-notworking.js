const fs = require('fs')

const data = fs.readFileSync('input.txt', 'utf8')

const reports = data.trim().split('\n')

/**
* Check if levels are safe
* @param levels {number[]} numbers - an array of numbers
* @returns {boolean} whether or not levels are safe
**/
function isSafe(levels) {
  const firstLevelDiff = levels[1] - levels[0]
  const direction = firstLevelDiff == 0 ? "" : (
    firstLevelDiff > 0 ? "up" : "down"
  )

  let unsafeLevels
  let i = 0
  while (i < levels.length - 1) {
    let safe = checkLevels(direction, levels[i], levels[i + 1])
    if (!safe) {
      unsafeLevels++
    }
    if (unsafeLevels > 1) {
      return false
    }
    i++
  }
  return true
}

/**
 * Test level pair
 * @param reportDirection {string} - up or down
 * @param current {number} - current level
 * @param next {number} - next level to compare to
 * @returns {boolean} whether or not pair is safe
**/
function checkLevels(reportDirection, current, next) {
  const levelDiff = next - current
  if (levelDiff == 0 || Math.abs(levelDiff) > 3) {
    return false
  }
  const direction = levelDiff > 0 ? "up" : "down"
  if (direction != reportDirection) {
    return false
  }
  return true
}

let safeReports = 0
reports.forEach(
  (report) => {
    const levels = report.split(' ').map(Number)
    isSafe(levels) && safeReports++
  }
)
console.log('safe reports:', safeReports)

