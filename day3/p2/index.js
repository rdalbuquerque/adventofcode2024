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

const regexp = new RegExp(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/, "g")
const commands = input.match(regexp)

enabledMul = true
console.log('commands:', commands)
let totalResult = 0
for (let i = 0; i < commands.length; i++) {
  if (commands[i].includes("mul") && enabledMul) {
    console.log('doing', commands[i])
    totalResult += doMult(commands[i])
    continue
  }
  if (commands[i].includes("don't")) enabledMul = false
  if (commands[i].includes("do()")) enabledMul = true
}
console.log('total result:', totalResult)






