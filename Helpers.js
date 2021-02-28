//* Async version of standart fs module. Just for avoid using callbacks or streams
const fs = require('fs').promises
const { MAX_NUMBER = 1000 } = require('./config')

class Helpers {
  //* Async write data to file
  static saveResults = async data => await fs.writeFile('./results.txt', data)
  //* Async read data from file
  static readResults = async () => {
    try {
      const data = await fs.readFile('./results.txt', { encoding: 'utf8' })
      if (data.trim()) {
        return data.split('\n')
      } else {
        throw new Error(`No results in file`)
      }
    } catch (err) {
      console.error(err?.message ?? err)
      return []
    }
  }
  //^ Each expression can contain any integer numbers between 0 and 1000.
  static checkNumbers = str => {
    const numbers = str.match(/\d+/g)
    //* Each expression must have minimum two numbers
    if (!numbers || numbers.length < 2) {
      throw new Error(`${str} -> Minimum two numbers required!`)
    } else if (str.match(/^-\d+|\s-\d+/g)) {
      throw new Error(`${str} -> Negative numbers are not valid`)
    } else if (numbers.some(num => num >= MAX_NUMBER)) {
      throw new Error(`${str} -> Numbers must be between 0 and ${MAX_NUMBER}!`)
    } else {
      return true
    }
  }
  //^ Each expression can contain any of the following symbols:  ' ', '+', '-', '*', '/', '(', ')'
  //* Expressions must have minimum two numbers and operand
  static checkExp = str => {
    if (!str || str.length < 3) {
      throw new Error(`${str} -> Expression must have minimum 3 chars!`)
    } else if (str?.match(/\d{1,3}|[\s\+\-\*\/\(\)]/g)?.join('') !== str) {
      throw new Error(`${str} -> Expression have invalid characters!`)
    } else if (!str.match(/[\+\-\*\/]/g)) {
      throw new Error(`${str} -> Expression must have operand!`)
    } else {
      return true
    }
  }
  static evalExp = str => {
    //* Checking numbers and characters
    this.checkExp(str) && this.checkNumbers(str)

    //* create function expression with result
    const func = new Function('', `return ${str}`)
    const result = func()

    //* Checking result, for easy-reading checkExp()
    if (result) {
      return result
    } else {
      throw new Error(`${str} -> Invalid expression result: ${result}`)
    }
  }
}

module.exports = Helpers
