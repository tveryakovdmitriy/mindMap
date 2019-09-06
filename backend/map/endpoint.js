import express from 'express'
import {MindMap} from './model'

const mapApi = express.Router()

mapApi.route('/:name')
  .get(function (req, res, next) {
    const name = req.params.name

    if (!name) {
      res.status(404).send('No mind map with such name')
    }
  
    console.log('name',name)
    MindMap.findOne({name}).
      populate({path: 'blocks', populate: {path: 'blocks'}}).
      exec(function(err, mindMap) {
        console.log(mindMap)
        console.log('err', err)
        if (!err) {
          res.json(mindMap)
        }
      })

  })
  .put(function (req, res, next) {
    console.log('put map')
    next()
  })
  .post(function(req, res, next) {
    console.log('post map')
    next()
  })
  .delete(function(req, res, next){
    console.log('delete map')
    next()
  })


  export default mapApi
