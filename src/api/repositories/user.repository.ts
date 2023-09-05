import { apiClient } from '../clients/apiClient.app'
import { UserCredential, User } from '../models/user.model'

export interface UserRepository {
  signUp: (userCredential: UserCredential) => Promise<User>
  login: (userCredential: UserCredential) => Promise<User>
  logout: () => Promise<void>
}

const signUp: UserRepository['signUp'] = async (userCredential): Promise<User> => {
  const { data } = await apiClient.post(`/signup`, userCredential)
  return data
}

const login: UserRepository['login'] = async (userCredential): Promise<User> => {
  //TODO: post or get
  const { data } = await apiClient.post(`/login`, userCredential)
  // const { data } = await apiClient.get(`/login?user_id=${userCredential.userId}?password=${userCredential.password}`)
  return data
}

const logout = async () => {
  const {} = await apiClient.post(`/logout`)
}

export const userRepository: UserRepository = {
  signUp,
  login,
  logout,
}
