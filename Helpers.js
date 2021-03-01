//* Default module, async version for shorter functions
const fs = require('fs').promises
//* Values can be changed
const {
  MAX_NUMBER,
  ACCEPT_ZERO,
  ACCEPT_NEGATIVE,
  ACCEPT_SIMPLE,
  RESULTS_FILE,
  RESULTS_SAVE_FLOAT,
  ERRORS_SHOW
} = require('./config')

class Helpers {
  static saveResults = async (data = '') => await fs.writeFile(`./${RESULTS_FILE}`, data)
  static readResults = async () => {
    try {
      const data = await fs.readFile(`./${RESULTS_FILE}`, { encoding: 'utf8' })

      //^ Checking file for invalid characters. Must contain only numbers and line breaks
      if (!data.trim()) {
        throw new Error(`Empty file!`)
      } else {
        return data.split('\n')
      }
    } catch (err) {
      if (ERRORS_SHOW) console.error(err?.message ?? err)
      return []
    }
  }
  static checkNumbers = str => {
    const numbers = str.match(/\d+/g)

    if (!numbers) {
      return false
    } else if (!ACCEPT_SIMPLE && numbers.length < 2) {
      return false
    } else if (!ACCEPT_NEGATIVE && str.match(/^-\d+|\s-\d+/g)) {
      return false
    } else if (!ACCEPT_ZERO && numbers.find(num => num == 0)) {
      return false
    } else if (numbers.find(num => num > MAX_NUMBER)) {
      return false
    } else {
      return true
    }
  }
  static checkExp = str => {
    if (!str) {
      return false
    } else if (str?.match(/[\d\s\+\-\*\/\(\)]/g)?.join('') !== str) {
      return false
    } else if (!ACCEPT_SIMPLE && !str.match(/[\+\-\*\/]/g)) {
      return false
    } else {
      return true
    }
  }
  static evalExp = str => {
    if (this.checkExp(str) && this.checkNumbers(str)) {
      const func = new Function('', `return ${str}`)
      const result = Number(func())

      if (RESULTS_SAVE_FLOAT) {
        return +result.toFixed(2)
      } else {
        return +result.toFixed(0)
      }
    } else {
      throw new Error(`${str} -> Invalid expression`)
    }
  }
  static randomNumber = (min = 1, max = MAX_NUMBER) => Math.floor(Math.random() * (max - min)) + min
  static randomExpression = () =>
    Array(this.randomNumber(3, 20))
      .fill(1)
      .map(v => `${this.randomNumber()} ${'+-/*'[this.randomNumber(0, 4)]} `)
      .join('') + this.randomNumber()

  static randomExpressions = (size = 10) => Array(size).fill(1).map(this.randomExpression)
}

module.exports = Helpers
