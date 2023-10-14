import { apiClient } from '../clients/apiClient'
import { UserCredential, User } from '../models/user.model'

export interface UserRepository {
  signup: (userCredential: UserCredential) => Promise<User>
  login: (userCredential: UserCredential) => Promise<void>
  logout: () => Promise<void>
}

const signup: UserRepository['signup'] = async (userCredential): Promise<User> => {
  const data = await apiClient.post(`/users/signup`, {
    user_id: userCredential.userId,
    password: userCredential.password,
  })
  return data
}

const login: UserRepository['login'] = async (userCredential) => {
  await apiClient.post(`/users/login`, {
    user_id: userCredential.userId,
    password: userCredential.password,
  })
}

const logout: UserRepository['logout'] = async () => {
  await apiClient.post(`/users/logout`)
}

export const userRepository: UserRepository = {
  signup,
  login,
  logout,
}
