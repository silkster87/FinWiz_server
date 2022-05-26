import { jest, describe, it, expect, afterAll } from '@jest/globals'
import * as commoditiesModels from '../../models/commodities.models'
import { App, server } from '../../index'
import supertest from 'supertest'

const request = supertest(App)
jest.mock('../../models/commodities.models')

const mockData = {
  name: 'Gold',
  type: 'metals',
  currency: 'USD',
  change: 12.34,
  change_percentage: 0.68,
  high: 1829.11,
  low: 1820.74,
  last: 1826.34,
  last_close: 1814
}

afterAll(() => {
  server.close()
})

describe('Commodities Controller tests', () => {
  it('should get commodities', async () => {
    // @ts-ignore
    jest.spyOn(commoditiesModels, 'liveCommodities').mockResolvedValue(mockData)
    const res = await request.get('/commodities-list')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(mockData)
  })

  it('should add commodity', async () => {
    // @ts-ignore
    jest.spyOn(commoditiesModels, 'addCommodity').mockResolvedValue(mockData)
    const res = await request.post('/user-add-commodity').send(mockData)
    expect(res.status).toBe(201)
    expect(res.body).toEqual(mockData)
  })

  it('should update commodity', async () => {
    // @ts-ignore
    jest.spyOn(commoditiesModels, 'updateCommodity').mockResolvedValue(mockData)
    const res = await request.patch('/user-update-commodity').send(mockData)
    expect(res.status).toBe(201)
    expect(res.body).toEqual(mockData)
  })
})
