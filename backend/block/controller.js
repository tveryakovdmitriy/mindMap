import express from 'express'
import blockSerice from './service'

const blockApi = express.Router()

blockApi.route('/')

  .delete(async function(req,res,next) {
    console.log('deelete', req.body.id)
    try {
      const result = await blockSerice.delete(req.body.id)
      return res.status(200).json(result)
    } catch(error) {
      return res.status(error.status||500).json(error)
    }
  })

export default blockApi