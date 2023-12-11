import { apiClient } from '../clients/apiClient'
import { UserCredential } from '../models/user.model'
import { User as UserResponse } from '../schemas/generated/schemas'
import { IsDuplicated as IsDuplicatedResponse } from '../schemas/generated/schemas'

export interface UserRepository {
  getUser: (accessToken: string) => Promise<UserResponse>
  signup: (userCredential: UserCredential, accessToken: string) => Promise<UserResponse>
  // login: (userCredential: UserCredential, accessToken: string) => Promise<void>
  // logout: (accessToken: string) => Promise<void>
  idDuplicateCheck: (
    userCredential: UserCredential,
    accessToken: string,
  ) => Promise<IsDuplicatedResponse>
  emailDuplicateCheck: (
    userCredential: UserCredential,
    accessToken: string,
  ) => Promise<IsDuplicatedResponse>
  analyze: (userCredential: UserCredential, accessToken: string) => Promise<UserResponse>
}

const getUser: UserRepository['getUser'] = async (accessToken) => {
  const data = await apiClient.get(`/users`, { accessToken: accessToken || '' })
  return data
}

const signup: UserRepository['signup'] = async (
  userCredential,
  accessToken,
): Promise<UserResponse> => {
  const data = await apiClient.post(
    `/users/signup`,
    { accessToken: accessToken || '' },
    {
      user_id: userCredential.userId,
      sub: userCredential.sub,
      email: userCredential.email,
    },
  )
  return data
}

// const login: UserRepository['login'] = async (userCredential, accessToken) => {
//   await apiClient.post(
//     `/users/login`,
//     { accessToken: accessToken },
//     {
//       user_id: userCredential.userId,
//     },
//   )
// }

// const logout: UserRepository['logout'] = async (accessToken) => {
//   await apiClient.post(`/users/logout`, { accessToken: accessToken })
// }

const idDuplicateCheck: UserRepository['idDuplicateCheck'] = async (
  userCredential,
  accessToken,
) => {
  const data = await apiClient.post(
    '/users/id-duplicate-check',
    { accessToken: accessToken },
    {
      userId: userCredential.userId,
    },
  )
  return data
}

const emailDuplicateCheck: UserRepository['emailDuplicateCheck'] = async (
  userCredential,
  accessToken,
) => {
  const data = await apiClient.post(
    '/users/email-duplicate-check',
    { accessToken: accessToken },
    {
      email: userCredential.email,
    },
  )
  return data
}

const analyze: UserRepository['analyze'] = async (userCredential, accessToken) => {
  const data = await apiClient.patch(
    `/users/comprehensive-analysis/${userCredential.userId}`,
    { accessToken: accessToken },
    {},
  )
  return data
}

export const userRepository: UserRepository = {
  getUser,
  signup,
  idDuplicateCheck,
  emailDuplicateCheck,
  analyze,
}
