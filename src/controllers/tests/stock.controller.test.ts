import { jest, describe, it, expect, afterAll } from '@jest/globals'
import * as apiRequests from '../../helpers/apiRequests'
import * as stockModels from '../../models/stock.models'
import { App, server } from '../../index'
import supertest from 'supertest'

jest.mock('../../helpers/apiRequests')
const request = supertest(App)

afterAll(() => {
  server.close()
})

describe('Stock Controller tests', () => {
  it('should return user stocks', async () => {
    const mockData = { symbol: 'AAPL', marketValuePerShare: 200 }
    // @ts-ignore
    jest.spyOn(apiRequests, 'getRequest').mockResolvedValueOnce({ data: mockData })
    const res = await request.get('/user-stock/AAPL')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(mockData)
  })

  it('should get the stock list', async () => {
    const mockData = { symbol: 'AAPL', marketValuePerShare: 200 }
    // @ts-ignore
    jest.spyOn(apiRequests, 'getRequest').mockResolvedValue({ data: mockData })
    // @ts-ignore
    jest.spyOn(stockModels, 'stockListModel').mockReturnValue(mockData)
    const res = await request.get('/stock-list')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ gainers: mockData, losers: mockData, mostActive: mockData })
  })
})
