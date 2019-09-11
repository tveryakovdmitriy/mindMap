import express from 'express'
const apiMiddleware = express.Router()
import mapApi from '../map/controller'
import userApi from '../user/controller';
import blockApi from '../block/controller'

apiMiddleware.use('/maps', mapApi)

export default apiMiddleware