import express from 'express'
const mapApi = express.Router()

mapApi.route('/')
  .get(function (req, res, next) {
    console.log('get map')
    next()
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
