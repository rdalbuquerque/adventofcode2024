const { throws } = require('assert')
const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

/**
  * @param multStr {string}
  * @returns {number}
**/
function doMult(multStr) {
  const regexp = new RegExp(/\d{1,3}/, "g")
  const nums = multStr.match(regexp).map(Number)
  if (nums.length != 2) throw "wrong number of digits", nums
  return nums[0] * nums[1]
}

const regexp = new RegExp(/mul\(\d{1,3},\d{1,3}\)/, "g")
const mults = input.match(regexp)

let totalResult = 0
mults.forEach((mult) => {
  totalResult += doMult(mult)
})
console.log(totalResult)




