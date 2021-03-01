const request = require('supertest')
const app = require('../app')
const { MAX_NUMBER, RESULTS_FILE } = require('../config')

const expressions = ['2+2', '3-1+23', '14+45*46', '999*999*999']
const values = {
  long: [...expressions, ...expressions, ...expressions, ...expressions, ...expressions],
  negative: [...expressions, '2+ -3'],
  large: [...expressions, `2 + ${MAX_NUMBER + 1}`],
  chars: [...expressions, '2+ ^ 3'],
  short: [...expressions, '2+']
}

describe('Test the index route', () => {
  it('Should response with 404 to get request', async () => {
    const getResponse = await request(app).get('/')
    expect(getResponse.statusCode).toBe(404)
  })
  it('Should response with 404 to post request', async () => {
    const getResponse = await request(app).post('/')
    expect(getResponse.statusCode).toBe(404)
  })
  it('Should response with 404 to patch request', async () => {
    const getResponse = await request(app).patch('/')
    expect(getResponse.statusCode).toBe(404)
  })
  it('Should response with 404 to delete request', async () => {
    const getResponse = await request(app).delete('/')
    expect(getResponse.statusCode).toBe(404)
  })
})
describe('Test the /data route', () => {
  it('Should response with status 200 for expressions with valid integers', async () => {
    const response = await request(app).post('/data').send({ expressions })
    expect(response.statusCode).toBe(200)
  })
  it('Should response with status 200 for lot of expressions with valid integers', async () => {
    const response = await request(app).post('/data').send({ expressions: values.long })

    expect(response.statusCode).toBe(200)
  })
  it('Should response with status 400 for expressions with negative integers', async () => {
    const response = await request(app).post('/data').send({ expressions: values.negative })
    expect(response.statusCode).toBe(400)
  })
  it('Should response with status 400 for expressions with large integers', async () => {
    const response = await request(app).post('/data').send({ expressions: values.large })
    expect(response.statusCode).toBe(400)
  })
  it('Should response with status 400 for expressions with chars integers', async () => {
    const response = await request(app).post('/data').send({ expressions: values.chars })
    expect(response.statusCode).toBe(400)
  })
  it('Should response with status 400 for expressions with short integers', async () => {
    const response = await request(app).post('/data').send({ expressions: expressions.short })
    expect(response.statusCode).toBe(400)
  })
  it('Should response with status 400 for empty expressions list', async () => {
    const response = await request(app).post('/data').send({ expressions: [] })
    expect(response.statusCode).toBe(400)
  })
  it('Should response with status 404 for other requests', async () => {
    const getResponse = await request(app).get('/data')
    const patchResponse = await request(app).patch('/data')
    const deleteResponse = await request(app).delete('/data')

    expect(getResponse.statusCode).toBe(404)
    expect(patchResponse.statusCode).toBe(404)
    expect(deleteResponse.statusCode).toBe(404)
  })
})
describe('Test the /result route', () => {
  it('Should return results after valid expressions', async () => {
    const validRequest = await request(app).post('/data').send({ expressions })
    expect(validRequest.statusCode).toBe(200)

    const response = await request(app).get('/result')
    expect(response.statusCode).toBe(200)
    expect(response.body.results).toBeDefined()
    expect(response.body.results).toEqual(['4', '25', '2084', '997002999'])
  })
  it('Should return empty result after invalid or empty expressions', async () => {
    const invalidRequest = await request(app).post('/data').send({ expressions: [] })
    expect(invalidRequest.statusCode).toBe(400)

    const response = await request(app).get('/result')
    expect(response.statusCode).toBe(200)
    expect(response.body.results).toBeDefined()
    expect(response.body.results).toEqual([])
  })
})
