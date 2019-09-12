import {validationResult} from 'express-validator'

export default async function(req, next, validationList) {
  await Promise.all(validationList.map(validation => validation.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = transformErrorData(errors)
    next(error)
  }

  next()

}

const transformErrorData = (errObj) => {
  const errorList = errObj && errObj.errors ? errObj.errors: errObj

  return {
    statusCode: errObj.statusCode || 400,
    errors: errorList,
  }
}