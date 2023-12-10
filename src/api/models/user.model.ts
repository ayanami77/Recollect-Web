import { userRepository } from '../repositories/user.repository'

export type User = {
  user_id: string
  user_name: string
  created_at: Date | string
  updated_at: Date | string
}

export type UserCredential = {
  userId: string
  sub: string
  email: string
}

export const userFactory = () => {
  const repository = userRepository
  return {
    signUp: async (userCredential: UserCredential, accessToken: string): Promise<User> => {
      const response = await repository.signup(userCredential, accessToken)
      return response
    },
    login: async (userCredential: UserCredential, accessToken: string) =>
      repository.login(userCredential, accessToken),
    logout: async (accessToken: string) => repository.logout(accessToken),
    idDuplicateCheck: async (userId: string, accessToken: string): Promise<boolean> => {
      const response = await repository.idDuplicateCheck(userId, accessToken)
      return response
    },
    emailDuplicateCheck: async (email: string, accessToken: string): Promise<boolean> => {
      const response = await repository.emailDuplicateCheck(email, accessToken)
      return response
    },
  }
}
