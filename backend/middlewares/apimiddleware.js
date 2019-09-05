import express from 'express'
const apiMiddleware = express.Router()
import mapApi from '../map/endpoint'
import userApi from '../user/endpoints';

apiMiddleware.use('/map', mapApi)
apiMiddleware.use('/user', userApi)

export default apiMiddleware