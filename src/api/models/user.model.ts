import { userRepository } from '../repositories/user.repository'

//TODO: 適宜修正
export type User = {
  user_id: string
  user_name: string
  email: string
  password: string
  created_at: Date | string
  updated_at: Date | string
  deleted_at: Date | string
}

export type UserCredential = {
  userId: string
  password: string
}

export const userFactory = () => {
  const repository = userRepository
  return {
    signUp: async (userCredential: UserCredential): Promise<User> => {
      const response = await repository.signUp(userCredential)
      return response
    },
    login: async (userCredential: UserCredential): Promise<User> => {
      const response = await repository.login(userCredential)
      return response
    },
    logout: async () => {
      await repository.logout()
    },
  }
}
