import { jest, describe, it, expect, afterAll } from '@jest/globals'
import * as apiRequests from '../../helpers/apiRequests'
import * as cryptoHelpers from '../../helpers/crypto.helpers'
import * as cryptoModels from '../../models/crypto.models'
import { App, server } from '../../index'
import supertest from 'supertest'

const request = supertest(App)
jest.mock('../../helpers/apiRequests')
jest.mock('../../helpers/crypto.helpers')
jest.mock('../../models/crypto.models')

afterAll(() => {
  server.close()
})

describe('Crypto Controller tests', () => {
  it('should get user crypto', async () => {
    const mockData = { symbol: 'BTC', marketValuePerCrypto: 30000 }
    // @ts-ignore
    jest.spyOn(apiRequests, 'getRequestWithHeaders').mockResolvedValue({ data: mockData })
    const res = await request.get('/user-crypto/BTC')
    expect(res.status).toBe(200)
    expect(res.body).toEqual(mockData)
  })

  it('should add user crypto', async () => {
    const mockData = { user: 'test', symbol: 'BTC', marketValuePerCrypto: 30000 }
    // @ts-ignore
    jest.spyOn(cryptoModels, 'addCrypto').mockResolvedValue(mockData)
    const res = await request.post('/user-add-crypto').send(mockData)
    expect(res.status).toBe(201)
    expect(res.body).toEqual(mockData)
  })

  it('should update user crypto', async () => {
    const mockReq = { sub: 'user', symbol: 'BTC', quantity: 1, boughtOrSold: true, date: '2022-05-26T14:30:00.000Z' }
    // @ts-ignore
    jest.spyOn(cryptoModels, 'updateCrypto').mockResolvedValue(mockReq)
    const res = await request.patch('/user-update-crypto').send(mockReq)
    expect(res.status).toBe(201)
    expect(res.body).toEqual(mockReq)
  })

  it('should get crypto list', async () => {
    const mockData = { symbol: 'BTC', marketValuePerCrypto: 30000 }
    // @ts-ignore
    jest.spyOn(apiRequests, 'getRequestWithHeaders').mockResolvedValue({ data: mockData })
    // @ts-ignore
    jest.spyOn(cryptoHelpers, 'cryptoListSorter').mockReturnValue(mockData)
    const res = await request.get('/crypto-list/')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ oldest: mockData, top: mockData, newest: mockData })
  })
})
