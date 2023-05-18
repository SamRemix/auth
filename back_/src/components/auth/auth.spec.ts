import request from 'supertest'

import app from '../../app'

const tester = {
  id: '643d66769fcf9d57b5864eea',
  name: 'Tester',
  email: 'tester@test.com',
  password: 'Tester123!'
}

describe('signup', () => {
  afterAll(async () => {
    await request(app)
      .delete(`/users/${tester.id}`)
  })

  it('create a new user', async () => {
    const { status } = await request(app)
      .post('/auth/signup')
      .send(tester)

    expect(status).toBe(200)
  })
})

describe('login', () => {
  beforeAll(async () => {
    await request(app)
      .post('/auth/signup')
      .send(tester)
  })

  afterAll(async () => {
    await request(app)
      .delete(`/users/${tester.id}`)
  })

  it('return user', async () => {
    const { status } = await request(app)
      .post('/auth/login')
      .send(tester)

    expect(status).toBe(200)
  })
})