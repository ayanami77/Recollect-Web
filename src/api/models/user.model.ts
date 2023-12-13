import { userRepository } from '../repositories/user.repository'
import {
  EmailDuplicateCheckRequest,
  IdDuplicateCheckRequest,
  SignupRequest,
} from '../schemas/types/user.type'

export type User = {
  userId: string
  userName: string
  comprehensiveAnalysisResult: string
  comprehensiveAnalysisScore: string
  createdAt: Date | string
  updatedAt: Date | string
}

export type UserCredential = {
  userId?: string
  sub?: string
  email?: string
}

export const userFactory = () => {
  const repository = userRepository
  return {
    getUser: async (accessToken: string) => {
      const response = await repository.getUser(accessToken)
      return {
        userId: response.user_id,
        userName: response.user_name,
        comprehensiveAnalysisResult: response.comprehensive_analysis_result,
        comprehensiveAnalysisScore: response.comprehensive_analysis_score,
        createdAt: response.created_at,
        updatedAt: response.updated_at,
      }
    },
    signUp: async (userCredential: SignupRequest, accessToken: string): Promise<User> => {
      const response = await repository.signup(userCredential, accessToken)
      return {
        userId: response.user_id,
        userName: response.user_name,
        comprehensiveAnalysisResult: response.comprehensive_analysis_result,
        comprehensiveAnalysisScore: response.comprehensive_analysis_score,
        createdAt: response.created_at,
        updatedAt: response.updated_at,
      }
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
      return {
        userId: response.user_id,
        userName: response.user_name,
        comprehensiveAnalysisResult: response.comprehensive_analysis_result,
        comprehensiveAnalysisScore: response.comprehensive_analysis_score,
        createdAt: response.created_at,
        updatedAt: response.updated_at,
      }
    },
  }
}
