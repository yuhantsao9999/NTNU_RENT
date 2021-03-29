require('dotenv').config()
const { signIn, signUp } = require('../../module/account')
const { teardown } = require('../../utils/testSetting')
const { randomStr } = require('../../utils/random')
const newUser = {
  email: randomStr(),
  password: randomStr(),
  last_name: randomStr(),
  first_name: randomStr(),
}

afterAll(async () => {
  await teardown(newUser.email)
})

describe('account function unit test', () => {
  test('a new account should be able to sign up', async (done) => {
    await signUp(newUser)
      .then((res) => {
        expect(res.error).toBeFalsy()
        expect(res.data.last_name).toBe(newUser.last_name)
        expect(res.data.first_name).toBe(newUser.first_name)
        expect(res.data.email).toBe(newUser.email)
      })
    done()
  })

  test('a duplicated email should not be able to sign up', async (done) => {
    await signUp(newUser)
      .then((res) => {
        expect(res.error).toBeTruthy()
      })
    done()
  })

  test('an old account should be able to log in', async (done) => {
    const { email, password } = newUser
    await signIn({ email, password })
      .then((res) => {
        expect(res.error).toBeFalsy()
        expect(res.data.last_name).toBe(newUser.last_name)
        expect(res.data.first_name).toBe(newUser.first_name)
        expect(res.data.email).toBe(newUser.email)
      })
    done()
  })

  test('an old account with the wrong password should not be able to log in', async (done) => {
    const { email } = newUser
    await signIn({ email, password: 'wrong' })
      .then((res) => {
        expect(res.error).toBeTruthy()
      })
    done()
  })
})
