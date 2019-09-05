import express from 'express'
const userApi = express.Router()

userApi.route('/')
  .get(function (req, res, next) {
    console.log('get user')
    next()
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