import mongoose from 'mongoose'

export default (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id)

  if (!isValid) {
    return false
  }

  return true
}