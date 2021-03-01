const Helpers = require('../Helpers')
const { MAX_NUMBER, RESULTS_FILE } = require('../config')
const fs = require('fs').promises

const readFile = async (filepath = `./${RESULTS_FILE}`) => await fs.readFile(filepath, { encoding: 'utf8' })

describe('Test generate', () => {
  it('Should generate random number', () => {
    const result = Helpers.randomNumber()
    expect(result).toBeGreaterThan(0)
  })
  it('Should generate random expression', () => {
    const result = Helpers.randomExpression()
    expect(result).toBeTruthy()
  })
  it('Should generate random expressions', () => {
    const result = Helpers.randomExpressions()
    expect(result).toBeTruthy()
  })
})
describe('Test Helpers.saveResults()', () => {
  it('Should save data to file', async () => {
    await Helpers.saveResults('Hello')
    const fileContent = await readFile()

    expect(fileContent).toBe('Hello')
  })
  it('Should save exact data to file', async () => {
    await Helpers.saveResults([1, 2, 3, 4, 5, 6].join('\n'))
    const fileContent = await readFile()

    expect(fileContent).toBe('1\n2\n3\n4\n5\n6')
  })
  it(`Should save '' if no function called with no arguments`, async () => {
    await Helpers.saveResults()
    const fileContent = await readFile()

    expect(fileContent).toBe('')
  })
})
describe('Test Helpers.readResults()', () => {
  it('Should return empty string before expressions evaluate', async () => {
    const fileContent = await readFile()

    expect(fileContent).toBe('')
  })
})
describe('Test Helpers.checkNumbers()', () => {
  it('Should return true on generated expressions', async () => {
    const expressions = Helpers.randomExpressions(100)
    const results = expressions.map(Helpers.checkNumbers)
    expect(results).toEqual(Array(100).fill(true))
  })
  it('Should return true on valid expressions', () => {
    const results = ['2+2-1', '35-4', '34+4*3/12'].map(Helpers.checkNumbers)
    expect(results).toEqual([true, true, true])
  })
  it('Should return false on only one number', () => {
    const results = ['2+2-1', '35-4', '34+4*3/12', '3', '334'].map(Helpers.checkNumbers)
    expect(results).toEqual([true, true, true, false, false])
  })
  it('Should return false on negative numbers', () => {
    const results = ['2+2-1', '35-4', '34+4*3/12', '3 + -12', '-12 + 4'].map(Helpers.checkNumbers)
    expect(results).toEqual([true, true, true, false, false])
  })
  it('Should return false on large numbers', () => {
    const results = ['2+2-1', '35-4', '34+4*3/12', `3+${MAX_NUMBER + 1}`, `-${MAX_NUMBER * 2} + 4`].map(
      Helpers.checkNumbers
    )
    expect(results).toEqual([true, true, true, false, false])
  })
})
describe('Test Helpers.checkExp()', () => {
  it('Should return true on valid expression', () => {
    const results = ['2+2-1', '35-4', '34+4*3/12'].map(Helpers.checkExp)
    expect(results).toEqual([true, true, true])
  })
  it('Should return false on invalid characters in expression', () => {
    const results = ['2+2-1', '35-4', '34+4*3/12', '34%2', '2+4fjgh'].map(Helpers.checkExp)
    expect(results).toEqual([true, true, true, false, false])
  })
  it('Should return true on no operator in expression', () => {
    const results = ['2+2-1', '35-4', '34+4*3/12', '3 8', '4 8 6 3'].map(Helpers.checkExp)
    expect(results).toEqual([true, true, true, false, false])
  })
})
describe('Test Helpers.evalExp()', () => {
  it('Should return results of expression', () => {
    const results = ['2+2', '2+2*2', '2*2*2*2'].map(Helpers.evalExp)
    expect(results).toEqual([4, 6, 16])
  })
  it('Should return results of expression', () => {
    const results = ['2+2-1', '35-4', '34+4'].map(Helpers.evalExp)
    expect(results).toEqual([3, 31, 38])
  })
  it('Should throw error on invalid expression', () => {
    expect(() => {
      ;['2+2-1', '2345'].map(Helpers.evalExp)
    }).toThrow()
  })
})
