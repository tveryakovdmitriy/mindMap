import express from 'express'
import blockService from './service'
import { validateExist, validateCreate } from './validator'

const blockApi = express.Router()

blockApi.route('/')
  .get(async function(req, res, next) {
    try {
      const blocks = await blockService.getAll(req.mapId)
      return res.status(200).json(blocks)
    } catch(error) {
      next(error)
    }
  })

  .post(validateCreate(), async function(req, res, next) {
    try {
      const createdBlobck = await blockService.create(req.mapId, req.body)
      return res.status(201).json(createdBlobck)
    } catch(error) {
      next(error)
    }
  })

blockApi.route('/:blockId')

  .get(validateExist(), async function(req, res, next) {
    try {
      const block = await blockService.getById(req.mapId, req.params.blockId)
      return res.status(200).json(block)
    } catch (error) {
      next(error)
    }
  })

  .put(validateExist(), validateCreate(), async function(req, res, next) {
    try {
      const updateResult = await blockService.update(req.params.blockId, req.body)
      return res.status(200).json(updateResult)
    } catch(error) {
      next(error)
    }
  })

  .delete (validateExist(), async function(req, res, next) {
    try {
      const deleteResult = await blockService.delete(req.mapId, req.params.blockId)
      return res.status(200).json(deleteResult)
    } catch(error) {
      next(error)
    }
  })

export default blockApi