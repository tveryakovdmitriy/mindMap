import express from 'express'
import mindMapService from './service'
import { MindMap } from './model'
import mindMapSerice from './service'

const mapApi = express.Router()

mapApi.route('/')

  .get(async function (req, res, next) {

    try {
      const mindMap = await mindMapService.getAll()
      return res.status(200).json(mindMap)

    } catch(error) {
      const status = error.status || 500
      return res.status(status).json(error)
    }

  })

  .post(async function (req, res, next) {
    try {
      const result = await mindMapService.create(req.body)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json(error)
    }
  })

mapApi.route('/:mapId')

  .get(async function (req, res, next) {
    try {
      const result = await mindMapService.getOne(req.params.mapId)
      return res.status(200).json(result)
    } catch(error) {
      return res.status(200).json(error)
    }
  })

  .put (async function (req, res, next) {
    const mindMapData = req.body
    const mapId = req.params.mapId
    
    try {
      const result = await mindMapService.update(mapId, mindMapData)
      return res.status(201).json(result)
    } catch(error) {
      return res.json(error)
    }

  })

  .delete (async function (req, res, next) {
    const mapId = req.params.mapId
    
    try {
      const result = await mindMapSerice.delete(mapId)
      return res.status(200).json(result)
    } catch(error) {
      return res.json(error)
    }
  })


  export default mapApi
