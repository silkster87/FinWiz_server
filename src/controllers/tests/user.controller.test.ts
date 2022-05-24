import { jest, describe, it, expect } from '@jest/globals'
import * as userModels from '../../models/user.models'
import * as stockModels from '../../models/stock.models'
import { App } from '../../index'
import supertest from 'supertest'

jest.mock('../../models/user.models')
const request = supertest(App)

describe('User Controller tests', () => {
  it('should return user profile from request sub', async () => {
    jest.spyOn(userModels, 'getProfile').mockReturnValue({ sub: 'test' })
    const res = await request.get('/user/test')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ sub: 'test' })
  })

  it('should add user stocks', async () => {
    // @ts-ignore
    jest.spyOn(stockModels, 'addStock').mockReturnValue({ sub: 'test', totalInvestmentValue: 1800 })
    const res = await request.post('/user-add-stock').send({ symbol: 'AAPL' })
    expect(res.status).toBe(201)
    expect(res.body).toEqual({ sub: 'test', totalInvestmentValue: 1800 })
  })

  it('should update user stock', async () => {
    const mockReq = { sub: 'user', symbol: 'AAPL', quantity: 1, boughtOrSold: true, date: '2022-04-10T18:30:00.000Z' }
    // @ts-ignore
    jest.spyOn(stockModels, 'updateStock').mockReturnValue(mockReq)
    const res = await request.patch('/user-update-stock').send(mockReq)
    expect(res.status).toBe(200)
    expect(res.body).toEqual(mockReq)
  })
})
