import express from 'express'
import mindMapService from './service'

const mapApi = express.Router()

mapApi.route('/:name*?')

  .get(async function (req, res, next) {
    const name = req.params.name
    if (!name) {
      return res.status(404).end('No mind map with such name')
    }

    try {
      const mindMap = await mindMapService.getMapWithBlocks({name})
      return res.status(200).json(mindMap)

    } catch(error) {
      const status = error.status || 500
      return res.status(status).json(error)
    }

  })

  .post(async function (req, res, next) {
    const data = req.params.mindMap

    try {
      const mindMap = await mindMapService.update(data)
      return res.status(200).json(mindMap)
    } catch (error) {
      return res.status(500).json(error)
    }
  })

  .delete(async function(req, res, next){
    const mapId = req.params.id 
    if (!mapId) {
      return res.status(404).send('No mind map with such id')
    }

    try {
      const result = await mindMapService.delete(mapId)
      return result
    } catch(error) {
      const status = error.status || 500
      return res.status(status).json(error)
    }
  })


  export default mapApi
