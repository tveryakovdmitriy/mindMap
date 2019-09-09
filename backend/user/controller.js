import express from 'express'
import mindMapSerice from '../map/service'
const userApi = express.Router()

userApi.route('/')

  .get(async function(req, res, next) {
    const mindMap = {
      name: 'test',
      blocks: [{title: '1'}, {title:'2'}, {title: '3'}]
    }
    try {
    const result = await mindMapSerice.create(mindMap)
    return res.send(result)
    }
    catch (error) {
      console.log(error)
      return res.json(error)
    }
  })

  .put(function (req, res, next) {
    console.log('put user')
    next()
  })
  .post(function(req, res, next) {
    console.log('post user')
    next()
  })
  .delete(function(req, res, next){
    console.log('delete user')
    next()
  })

  export default userApi