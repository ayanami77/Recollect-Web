import { apiClient } from '../clients/apiClient'
import {
  AnalyzeResponse,
  EmailDuplicateCheckRequest,
  EmailDuplicateCheckResponse,
  GetUserResponse,
  IdDuplicateCheckRequest,
  IdDuplicateCheckResponse,
  SignupRequest,
  SignupResponse,
} from '../schemas/types/user.type'

export interface UserRepository {
  getUser: (accessToken: string) => Promise<GetUserResponse>
  signup: (userCredential: SignupRequest, accessToken: string) => Promise<SignupResponse>
  // login: (userCredential: UserCredential, accessToken: string) => Promise<void>
  // logout: (accessToken: string) => Promise<void>
  idDuplicateCheck: (
    userCredential: IdDuplicateCheckRequest,
    accessToken: string,
  ) => Promise<IdDuplicateCheckResponse>
  emailDuplicateCheck: (
    userCredential: EmailDuplicateCheckRequest,
    accessToken: string,
  ) => Promise<EmailDuplicateCheckResponse>
  analyze: (accessToken: string) => Promise<AnalyzeResponse>
}

const getUser: UserRepository['getUser'] = async (accessToken): Promise<GetUserResponse> => {
  const data = await apiClient.get(`/users`, { accessToken: accessToken || '' })
  return data
}

const signup: UserRepository['signup'] = async (
  userCredential,
  accessToken,
): Promise<SignupResponse> => {
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
): Promise<IdDuplicateCheckResponse> => {
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
): Promise<EmailDuplicateCheckResponse> => {
  const data = await apiClient.post(
    '/users/email-duplicate-check',
    { accessToken: accessToken },
    {
      email: userCredential.email,
    },
  )
  return data
}

const analyze: UserRepository['analyze'] = async (accessToken): Promise<AnalyzeResponse> => {
  const data = await apiClient.patch(
    `/users/comprehensive-analysis`,
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
