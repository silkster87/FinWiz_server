// CONTROLLERS
import { getStockList, getUserStocks } from '../controllers/stock.controllers';
import { getUserCrypto } from '../controllers/crypto.controllers';
// ROUTER
import { Router } from 'express';

const router = Router();

router.get('/user-stock/:stocklist', getUserStocks)
router.get('/user-crypto/:cryptolist', getUserCrypto)
router.get('/stock-list-:type', getStockList)

export default router;
