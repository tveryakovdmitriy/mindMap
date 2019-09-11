import {check, validationResult} from 'express-validator'
import validateRequest from '../helpers/validation/validateRequest'
import mindMapSerice from './service'

export const validateCreate = () => async function(req,res, next) {
  const validationList = [
    check('name', 'Необходимо указать имя').not().isEmpty()
  ]

  validateRequest(req, next, validationList)
}

export const validateExist = () => async function(req, res, next) {
  const validationList = [
    check('mapId').exists({checkNull: true}).custom(async (mapId) => {
      const mindMap = await mindMapSerice.getById(mapId)
      if (!mindMap) {
        throw 'Не удалось найти карту'
      }

      return true
    })
  ]

  validateRequest(req, next, validationList)
}