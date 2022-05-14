import Prisma from '../models'


export const stockFinder = async (symbol: string) => {
    return Prisma.singleStock.findUnique({
      where: { symbol: symbol }
    })
}

export const stockApiFormatter = (data, symbol) => {
    const marketValuePerShare = data.data[symbol].quote.latestPrice
    const name = data.data[symbol].quote.companyName

    return { symbol, name, marketValuePerShare }
}

export const stockUpdateOrCreate = async (req, data) => {
    const result = await stockFinder(req.symbol)
    const stockData = stockApiFormatter(data, req.symbol)
    
    if (!result) {
        return Prisma.singleStock.create({
        data: stockData
      })
    }

    return Prisma.singleStock.update({
      where: { symbol: req.symbol },
      data: { marketValuePerShare : stockData.marketValuePerShare }
    })
}
