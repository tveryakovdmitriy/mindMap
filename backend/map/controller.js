import express from 'express'
import mindMapService from './service'
import { MindMap } from './model'
import mindMapSerice from './service'
import {validateCreate, validateExist} from './validator'
import blockApi from '../block/controller'

const mapApi = express.Router()

mapApi.route('/')

  .get(async function (req, res, next) {

    try {
      const mindMap = await mindMapService.getAll()
      return res.status(200).json(mindMap)

    } catch(error) {
      next(error)
    }

  })

  .post(validateCreate(), async function (req, res, next) {
    try {
      const result = await mindMapService.create(req.body)
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  })

mapApi.route('/:mapId')

  .all(validateExist())

  .get(async function (req, res, next) {
    try {
      const result = await mindMapService.getById(req.params.mapId)
      return res.status(200).json(result)
    } catch(error) {
      next(error)
    }
  })

  .put (validateCreate(), async function (req, res, next) {
    const mindMapData = req.body
    const mapId = req.params.mapId
    
    try {
      const result = await mindMapService.update(mapId, mindMapData)
      return res.status(201).json(result)
    } catch(error) {
      next(error)
    }

  })

  .delete (async function (req, res, next) {
    const mapId = req.params.mapId
    
    try {
      const result = await mindMapSerice.delete(mapId)
      return res.status(200).json(result)
    } catch(error) {
      next(error)
    }
  })

mapApi.use('/:mapId/blocks', validateExist(), function(req, res, next) {
  req.mapId = req.params.mapId
  next()
}, blockApi)

export default mapApi
