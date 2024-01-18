import { User, toUser } from '../models/user.model'
import { userRepository } from '../repositories/user.repository'
import {
  EmailDuplicateCheckRequest,
  IdDuplicateCheckRequest,
  SignupRequest,
} from '../schemas/types/user.type'

export const userFactory = () => {
  const repository = userRepository
  return {
    getUser: async (accessToken: string) => {
      const response = await repository.getUser(accessToken)
      return toUser(response)
    },
    signUp: async (userCredential: SignupRequest, accessToken: string): Promise<User> => {
      const response = await repository.signup(userCredential, accessToken)
      return toUser(response)
    },
    idDuplicateCheck: async (
      userCredential: IdDuplicateCheckRequest,
      accessToken: string,
    ): Promise<boolean> => {
      const response = await repository.idDuplicateCheck(userCredential, accessToken)
      return response
    },
    emailDuplicateCheck: async (
      userCredential: EmailDuplicateCheckRequest,
      accessToken: string,
    ): Promise<boolean> => {
      const response = await repository.emailDuplicateCheck(userCredential, accessToken)
      return response
    },
    analyze: async (accessToken: string): Promise<User> => {
      const response = await repository.analyze(accessToken)
      return toUser(response)
    },
  }
}
