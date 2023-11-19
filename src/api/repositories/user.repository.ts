import { apiClient } from '../clients/apiClient'
import { UserCredential } from '../models/user.model'
import { User as UserResponse } from '../schemas/generated/schemas'

export type IdDuplicateCheckResponse = {
  isDuplicate: boolean
}

export type EmailDuplicateCheckResponse = {
  isDuplicate: boolean
}

export interface UserRepository {
  signup: (userCredential: UserCredential, accessToken: string) => Promise<UserResponse>
  login: (userCredential: UserCredential, accessToken: string) => Promise<void>
  logout: (accessToken: string) => Promise<void>
  idDuplicateCheck: (userId: string, accessToken: string) => Promise<IdDuplicateCheckResponse>
  emailDuplicateCheck: (email: string, accessToken: string) => Promise<EmailDuplicateCheckResponse>
}

const signup: UserRepository['signup'] = async (userCredential, accessToken): Promise<UserResponse> => {
  console.log(userCredential, accessToken)
  const data = await apiClient.post(`/users/signup`, 
    {accessToken: accessToken || ""},
    {
      user_id: userCredential.userId,
      sub: userCredential.sub,
      email: userCredential.email,
    }
  )
  return data
}

const login: UserRepository['login'] = async (userCredential, accessToken) => {
  await apiClient.post(`/users/login`,{accessToken: accessToken}, {
    user_id: userCredential.userId,
  })
}

const logout: UserRepository['logout'] = async (accessToken) => {
  await apiClient.post(`/users/logout`, {accessToken: accessToken},)
}

const idDuplicateCheck: UserRepository['idDuplicateCheck'] = async (userId, accessToken) => {
  const data = await apiClient.post('/users/id_duplicate_check', {accessToken: accessToken}, {
    userId: userId,
  })
  return data
}

const emailDuplicateCheck: UserRepository['emailDuplicateCheck'] = async (email, accessToken) => {
  const data = await apiClient.post('/users/email_duplicate_check', {accessToken: accessToken}, {
    email: email,
  })
  return data
}

export const userRepository: UserRepository = {
  signup,
  login,
  logout,
  idDuplicateCheck,
  emailDuplicateCheck,
}
