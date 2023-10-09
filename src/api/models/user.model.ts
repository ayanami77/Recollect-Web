import { userRepository } from '../repositories/user.repository'

export type User = {
  user_id: string
  user_name: string
  created_at: Date | string
  updated_at: Date | string
}

export type UserCredential = {
  userId: string
  password: string
}

export const userFactory = () => {
  const repository = userRepository
  return {
    signUp: async (userCredential: UserCredential): Promise<User> => {
      const response = await repository.signup(userCredential)
      return response
    },
    login: async (userCredential: UserCredential) => repository.login(userCredential),
    logout: async () => repository.logout(),
  }
}
