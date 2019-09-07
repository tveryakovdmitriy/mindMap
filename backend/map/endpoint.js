import express from 'express'
import mindMapController from './controller'

const mapApi = express.Router()

mapApi.route('/:name*?')
  .get(async function (req, res, next) {
    const name = req.params.name
    if (!name) {
      return res.status(404).end('No mind map with such name')
    }

    const mindMap = await mindMapController.getMapWithBlocks({name})

    if (mindMap) {
        return res.json(mindMap)
    }

    return res.status(404).send('No mindMapFound')

  })
  .put(function (req, res, next) {
    console.log('put map')
    next()
  })
  .post(function(req, res, next) {
    const mindMap = req.body.data
    mindMapController.create(mindMap)
    next()
  })
  .delete(function(req, res, next){
    console.log('delete map')
    next()
  })


  export default mapApi
