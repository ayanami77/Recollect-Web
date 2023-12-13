import { IsDuplicated, User } from '../generated/schemas'

export type GetUserResponse = User

export type SignupRequest = {
  userId: string
  sub: string
  email: string
}

export type SignupResponse = User

export type IdDuplicateCheckRequest = {
  userId: string
}

export type IdDuplicateCheckResponse = IsDuplicated

export type EmailDuplicateCheckRequest = {
  email: string
}

export type EmailDuplicateCheckResponse = IsDuplicated

export type AnalyzeResponse = User
