require('dotenv').config()
const { getAllSell, getUserRent, getUserSell } = require('../../module/image')
const { teardown, setUp } = require('../../utils/testSetting')
const { randomStr } = require('../../utils/random')

const testEmail = randomStr()

beforeAll(async () => {
  await setUp(testEmail)
})

afterAll(async () => {
  await teardown(testEmail)
})

describe('image function unit test', () => {
  test('can get all item from rent list', async (done) => {
    await getAllRent().then((res) => {
      expect(res.error).toBeFalsy()
      expect(res.data.length).toBe(1)
    })
    done()
  })

  test('can get all item from sell list', async (done) => {
    await getAllSell().then((res) => {
      expect(res.error).toBeFalsy()
      expect(res.data.length).toBe(1)
    })
    done()
  })

  test('can get user item from rent list', async (done) => {
    await getUserRent(testEmail).then((res) => {
      expect(res.error).toBeFalsy()
      expect(res.data.length).toBe(1)
    })
    done()
  })

  test('can get user item from sell list', async (done) => {
    await getUserSell(testEmail).then((res) => {
      expect(res.error).toBeFalsy()
      expect(res.data.length).toBe(1)
    })
    done()
  })
})
