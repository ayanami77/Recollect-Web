import { create } from 'zustand'

type State = {
  isShow: boolean
  message: string
  type: 'success' | 'error'
  show: (message: string, type: 'success' | 'error') => void
  hide: () => void
}

export const useToastStore = create<State>((set) => ({
  isShow: false,
  message: '',
  type: 'success',
  show: (message, type) => set({ isShow: true, message, type }),
  hide: () => {
    setTimeout(() => {
      set({ isShow: false, message: '', type: 'success' })
    }, 2000)
  },
}))
