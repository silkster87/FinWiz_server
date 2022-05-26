import { Request, Response } from 'express'
import { addCommodity, liveCommodities, updateCommodity } from '../models/commodities.models'

export const getCommodities = async (req: Request, res: Response) => {
  try {
    const resData = await liveCommodities()
    res.status(200)
    res.send(resData)
  } catch (err) {
    console.error('Error in getCommodities', err)
    res.sendStatus(500)
  }
}

export const addUserCommodity = async (req: Request, res: Response) => {
  try {
    const result = await addCommodity(req)
    res.status(201)
    res.send(result)
  } catch (err) {
    console.error('Error in addUserCrypto: ', err)
    res.sendStatus(500)
  }
}

export const updateUserCommodity = async (req: Request, res: Response) => {
  try {
    const result = await updateCommodity(req)
    res.status(201)
    res.send(result)
  } catch (err) {
    console.error('Error in updateUserCommodity: ', err)
    res.sendStatus(500)
  }
}
