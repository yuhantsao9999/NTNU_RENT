require('dotenv').config()
const { rentList } = require('../../module/rentList')
const { sellList } = require('../../module/sellList')
const { teardown, setUp } = require('../../utils/testSetting')
const { randomStr } = require('../../utils/random')

const testEmail = randomStr()
const files = [{ key: randomStr() }, { key: randomStr() }]

beforeAll(async () => {
  await setUp(testEmail)
})

afterAll(async () => {
  await teardown(testEmail)
})

describe('list function unit test', () => {
  test('the new item should be able to add to the rent list', async (done) => {
    const rent = {
      name: randomStr(),
      price: 0,
      amount: 0,
      email: testEmail,
      long: 0,
      main_category: randomStr(),
      second_category: randomStr(),
    }
    await rentList(files, JSON.stringify(rent)).then((res) => {
      expect(res.error).toBeFalsy()
      expect(res.data.status).toBeTruthy()
    })
    done()
  })

  test('the new item should be able to add to the sell list', async (done) => {
    const sell = {
      name: randomStr(),
      price: 0,
      amount: 0,
      email: testEmail,
      main_category: randomStr(),
      second_category: randomStr(),
    }
    await sellList(files, JSON.stringify(sell)).then((res) => {
      expect(res.error).toBeFalsy()
      expect(res.data.status).toBeTruthy()
    })
    done()
  })
})
