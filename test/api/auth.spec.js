const request = require('supertest')
const app = require("../../app")
require("../../controllers/api/authController")
const bcrypt = require("bcryptjs")

describe('Endpoint API ', () => {
  it('/register : Should create a new account', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'testing',
        password: '1',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('data')
  })
  
  it('Should compare hashing password', async () => {
    let pwd = "its is password"
    let hash = bcrypt.hashSync(pwd, 8)
    expect(true).toEqual(bcrypt.compareSync(pwd,hash))
  })
  
  it('/login : Should success login', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'testiscool',
        password: '1',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })
  
  it('/login : Should NOT login because username and password doesn`t match', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'abcdefg',
        password: '1',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })
})
