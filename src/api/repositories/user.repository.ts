import { getServerSession } from 'next-auth'
import { apiClient } from '../clients/apiClient'
import { UserCredential } from '../models/user.model'
import { User as UserResponse } from '../schemas/generated/schemas'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export type IdDuplicateCheckResponse = {
  isDuplicate: boolean
}

export type EmailDuplicateCheckResponse = {
  isDuplicate: boolean
}

export interface UserRepository {
  signup: (userCredential: UserCredential) => Promise<UserResponse>
  login: (userCredential: UserCredential) => Promise<void>
  logout: () => Promise<void>
  idDuplicateCheck: (userId: string) => Promise<IdDuplicateCheckResponse>
  emailDuplicateCheck: (email: string) => Promise<EmailDuplicateCheckResponse>
}


const signup: UserRepository['signup'] = async (userCredential): Promise<UserResponse> => {
  const session = await getServerSession(authOptions)
  console.log(session?.user)
  if (!session) {
    throw new Error('Session is not found')
  }
  const data = await apiClient.post(`/users/signup`, 
    {accessToken: session.user.access_token || ""},
    {
      user_id: userCredential.userId,
      sub: session.user.sub,
      email: session.user.email,
    }
  )
  return data
}

const login: UserRepository['login'] = async (userCredential) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Session is not found')
  }
  await apiClient.post(`/users/login`,{accessToken: session.user.access_token || ""}, {
    user_id: userCredential.userId,
  })
}

const logout: UserRepository['logout'] = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Session is not found')
  }
  await apiClient.post(`/users/logout`, {accessToken: session.user.access_token || ""},)
}

const idDuplicateCheck: UserRepository['idDuplicateCheck'] = async (userId) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Session is not found')
  }
  const data = await apiClient.post('/users/id_duplicate_check', {accessToken: session.user.access_token || ""}, {
    userId: userId,
  })
  return data
}

const emailDuplicateCheck: UserRepository['emailDuplicateCheck'] = async (email) => {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Session is not found')
  }
  const data = await apiClient.post('/users/email_duplicate_check', {accessToken: session.user.access_token || ""}, {
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
