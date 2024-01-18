import { User as UserResponse } from '../schemas/generated/schemas'

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

export const toUser = (user: UserResponse): User => {
  return {
    userId: user.user_id,
    userName: user.user_name,
    comprehensiveAnalysisResult: user.comprehensive_analysis_result,
    comprehensiveAnalysisScore: user.comprehensive_analysis_score,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  }
}
