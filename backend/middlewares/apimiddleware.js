import express from 'express'
const apiMiddleware = express.Router()
import mapApi from '../map/controller'
import userApi from '../user/controller';

apiMiddleware.use('/map', mapApi)
apiMiddleware.use('/user', userApi)

export default apiMiddleware