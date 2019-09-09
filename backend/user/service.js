import {User} from './model'

const userService = {
  create: async (userData) => {
    const user = new User(userData)

    try {
      await user.save()
    } catch(error) {
      throw error
    }
  }
}

export default userService