import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser:  (user)  => set({ user }),
      setToken: (token) => {
        localStorage.setItem('access_token', token)
        set({ token })
      },
      logout: () => {
        localStorage.removeItem('access_token')
        set({ user: null, token: null })
      },
    }),
    { name: 'auth-storage' }
  )
)

export default useAuthStore
