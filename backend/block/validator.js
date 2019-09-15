import mongoose from 'mongoose'
import {sanitizeParam, check, validationResult} from 'express-validator'

import filterInput from '../middlewares/filterInput'
import blockService from './service'
import validateObjectId from '../helpers/validation/validateObjectId'

export const validateExist = () => function(req, res, next) {
  const validationList = [

    check('blockId').custom(async (blockId) => {
      const blockExists = await doBlockExist(blockId)

      if (!blockExists) {
        throw ('Блока с таким id не существует')
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
    check('title', 'Поле является обязательным').not().isEmpty(),
    check('parentId').custom(async parentId => {
      if (!parentId || await doBlockExist(parentId)) {
        return true
      }

      throw 'Блока с таким id не существует'
    }),
    check('description').isString().optional(),
    check('coordinates.x').not().isEmpty().withMessage('Необходио указать координату x').bail().isInt().withMessage('Поле должно быть числовым'),
    check('coordinates.y').not().isEmpty().withMessage('Необходимо указать координату y').bail().isInt().withMessage('Поле должно быть числовым')
  ]  
  return filterInput(req, next,validationList)
}

const doBlockExist = async (blockId) => {
  const isValidId = validateObjectId(blockId)

  if (!isValidId) return false

  return await blockService.getById(blockId)
}