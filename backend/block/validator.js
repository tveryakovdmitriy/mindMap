import mongoose from 'mongoose'
import {sanitizeParam, check, validationResult} from 'express-validator'

import filterInput from '../middlewares/filterInput'
import blockService from './service'
import validateObjectId from '../helpers/validation/validateObjectId'

export const validateExist = () => function(req, res, next) {
  const validationList = [

    check('blockId').custom(async (blockId) => {
      const isValidId = validateObjectId(blockId)

      if (!isValidId) {
        throw ('Неправильный формат')
      }

      const block = await blockService.getById(blockId)
      if (!block) {
        throw 'Не удалось найти блок'
      }

      return true
    }),

    sanitizeParam('blockId').customSanitizer(value => {
      try {
      return mongoose.Types.ObjectId(value);
      } catch(error) {
        return value
      }
    }),
  ]

  return filterInput(req, next, validationList)
}

export const validateCreate = () => function(req, res, next) {
  const validationList = [
    check('title', 'Поле является обязательным').not().isEmpty()
  ]  
  return filterInput(req, next,validationList)
}