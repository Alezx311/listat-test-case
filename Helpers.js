//* Default module, async version for shorter functions
const fs = require('fs').promises
//* Values can be changed
const { MAX_NUMBER, ACCEPT_ZERO, ACCEPT_NEGATIVE, ACCEPT_SIMPLE, RESULTS_FILE } = require('./config')

class Helpers {
  //^ Save results to file
  static saveResults = async (data = '') => await fs.writeFile(`./${RESULTS_FILE}`, data)
  //^ Read results from file. If No file, or no content, returns []
  static readResults = async () => {
    try {
      const data = await fs.readFile(`./${RESULTS_FILE}`, { encoding: 'utf8' })
      //^ Checking file for invalid characters. Must contain only numbers and line breaks
      if (data.trim() && !data.match(/[^\d\n]/g)) {
        return data.split('\n')
      } else {
        return []
      }
    } catch (err) {
      if (ERRORS_SHOW) console.error(err?.message ?? err)
      return []
    }
  }
  //* Simple regexp tests with numbers in expression
  static checkNumbers = str => {
    const numbers = str.match(/\d+/g)

    if (!numbers) {
      return false
    } else if (!ACCEPT_SIMPLE && numbers.length < 2) {
      //^ Has minimum two numbers? "2+", "+7", "56" not valid.
      return false
    } else if (!ACCEPT_NEGATIVE && str.match(/^-\d+|\s-\d+/g)) {
      //^ Has negative numbers?
      return false
    } else if (!ACCEPT_ZERO && numbers.find(num => num == 0)) {
      //^ Has zero
      return false
    } else if (numbers.find(num => num > MAX_NUMBER)) {
      //^ Has numbers greater than MAX_NUMBER ? (1000 as default)
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
      return func()
    } else {
      throw new Error(`${str} -> Invalid expression`)
    }
  }
}

module.exports = Helpers
