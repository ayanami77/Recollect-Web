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
  hide: () => {
    setTimeout(() => {
      set({ isShow: false, message: '', type: 'success' })
    }, 2000)
  },
}))

export default useStore
