import app from '../../app'

import request from 'supertest'

import UsersService from '../users/users.service'

import findUserByEmail from '../../utils/findUserByEmail'

const { remove } = new UsersService()

const tester = {
  name: 'Tester',
  email: 'tester@test.com',
  password: 'Tester123!'
}

afterAll(async () => {
  const { id } = await findUserByEmail(tester.email) as { id: string }

  await remove(id)
})

describe('POST /auth/signup', () => {
  it('sign up', async () => {
    const { status } = await request(app)
      .post('/auth/signup')
      .send(tester)

    expect(status).toEqual(200)
  })
})

describe('POST /auth/login', () => {
  it('log in', async () => {
    const { status } = await request(app)
      .post('/auth/login')
      .send(tester)

    expect(status).toBe(200)
  })
})