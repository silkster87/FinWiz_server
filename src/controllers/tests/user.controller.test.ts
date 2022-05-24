import { jest, describe, it, expect, afterAll } from '@jest/globals'
import * as userModels from '../../models/user.models'
import { App } from '../../index'
import supertest from 'supertest'

jest.mock('../../models/user.models')
const request = supertest(App)

afterAll(done => {
  done()
})

describe('User Controller tests', () => {
  it('should return user profile from request sub', async () => {
    // Mock the getProfile method
    jest.spyOn(userModels, 'getProfile').mockReturnValue({ sub: 'test' })
    const res = await request.get('/user/test')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ sub: 'test' })
  })
})
