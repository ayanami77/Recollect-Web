import { create } from 'zustand'

// Toastの表示に関するState
type State = {
  isShow: boolean
  message: string
  type: 'success' | 'error'
  show: (message: string, type: 'success' | 'error') => void
  hide: () => void
}

const useStore = create<State>((set) => ({
  isShow: false,
  message: '',
  type: 'success',
  show: (message, type) => set({ isShow: true, message, type }),
  hide: () => set({ isShow: false, message: '', type: 'success' }),
}))

export default useStore
