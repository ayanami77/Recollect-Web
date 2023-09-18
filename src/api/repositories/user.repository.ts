import { apiClient } from '../clients/apiClient'
import { UserCredential, User } from '../models/user.model'

export interface UserRepository {
  signUp: (userCredential: UserCredential) => Promise<User>
  login: (userCredential: UserCredential) => Promise<User>
  logout: () => Promise<void>
}

const signUp: UserRepository['signUp'] = async (userCredential): Promise<User> => {
  const { data } = await apiClient.post(`/user/signup`, {
    user_id: userCredential.userId,
    password: userCredential.password,
  })
  return data
}

const login: UserRepository['login'] = async (userCredential): Promise<User> => {
  const { data } = await apiClient.post(
    `/user/login`,
    {
      user_id: userCredential.userId,
      password: userCredential.password,
    },
    {
      withCredentials: true,
    },
  )
  return data
}

const logout: UserRepository['logout'] = async () => {
  const {} = await apiClient.post(
    `/user/logout`,
    {},
    {
      withCredentials: true,
    },
  )
}

export const userRepository: UserRepository = {
  signUp,
  login,
  logout,
}
