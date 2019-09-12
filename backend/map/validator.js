import {check, validationResult} from 'express-validator'
import filterInput from '../middlewares/filterInput'
import mindMapSerice from './service'
import validateObjectId from '../helpers/validation/validateObjectId'

export const validateCreate = () => async function(req,res, next) {
  const validationList = [
    check('name', 'Поле является обязательным').not().isEmpty()
  ]

  filterInput(req, next, validationList)
}

export const validateExist = () => async function(req, res, next) {
  const validationList = [
    check('mapId').custom(async (mapId) => {
      const isValid = validateObjectId(mapId)

      if (!isValid) {
        throw 'Неправильный формат'
      }


      const mindMap = await mindMapSerice.getById(mapId)
      if (!mindMap) {
        throw 'Не удалось найти карту'
      }

      return true
    })
  ]

  filterInput(req, next, validationList)
}