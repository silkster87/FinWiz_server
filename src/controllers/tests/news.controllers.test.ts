import { jest, describe, it, expect, afterAll } from '@jest/globals'
import * as apiRequests from '../../helpers/apiRequests'
import { userNewsUrl } from '../../helpers/urls'
import { App, server } from '../../index'
import supertest from 'supertest'

const request = supertest(App)
jest.mock('../../helpers/apiRequests')

afterAll(() => {
  server.close()
})

describe('News Controller tests', () => {
  it('should get the news list', async () => {
    const mockArticle = { title: 'Title', description: 'Description', url: 'http://example.com', urlToImage: 'url/images/' }
    const expectedArticle = [{ title: 'Title', description: 'Description', url: 'http://example.com', image: 'url/images/' }]
    const mockData = { data: { articles: [mockArticle] } }
    // @ts-ignore
    jest.spyOn(apiRequests, 'getRequest').mockResolvedValue(mockData)
    const res = await request.get('/news')
    expect(res.status).toBe(201)
    expect(res.body).toEqual(expectedArticle)
  })

  it('should get the user news list', async () => {
    const mockArticle = { title: 'Title', description: 'Description', url: 'http://example.com', urlToImage: 'url/images/' }
    const expectedArticle = [{ title: 'Title', description: 'Description', url: 'http://example.com', image: 'url/images/' }]
    const mockData = { data: { articles: [mockArticle] } }
    const spyRequest = jest.spyOn(apiRequests, 'getRequest')
    // @ts-ignore
    jest.spyOn(apiRequests, 'getRequest').mockResolvedValue(mockData)
    const res = await request.get('/user-news/AAPL,TSLA')
    expect(spyRequest).toHaveBeenLastCalledWith(userNewsUrl('AAPL+TSLA'))
    expect(res.status).toBe(201)
    expect(res.body).toEqual(expectedArticle)
  })
})
