import UserModel from './model'

const userController = {
  create: (fields) => UserModel.create({...fields}, function(error) {console.log('error while creating user'); throw error})
}

export default userController