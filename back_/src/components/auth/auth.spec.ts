import prisma from '../../prisma'
import app from '../../app'

import request from 'supertest'

import UsersService from '../users/users.service'

const usersService = new UsersService()

const tester = {
  name: 'Tester',
  email: 'tester@test.com',
  password: 'Tester123!'
}

afterAll(async () => {
  const { id } = await prisma.user.findUnique({
    where: {
      email: 'tester@test.com'
    }
  }) as { id: string }

  await usersService.remove(id)
})

describe('POST /auth/signup', () => {
  it('sign up', async () => {
    const { status, body } = await request(app)
      .post('/auth/signup')
      .send(tester)

    expect(status).toEqual(200)
    expect(body.user.name).toEqual(tester.name)
  })
})

describe('POST /auth/login', () => {
  it('log in', async () => {
    const { status, body } = await request(app)
      .post('/auth/login')
      .send(tester)

    expect(status).toBe(200)
    expect(body.user.name).toEqual(tester.name)
  })
})