import { create } from "zustand"

interface SignupState {
    step:number,
    email: string
    password: string
    confirmPassword: string
    nickname:string
    profileImage:string
    setStep:(step:number) => void, 
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    setConfirmPassword: (confirmPassword: string) => void,
    setNickname: (nickname: string) => void,
    setprofileImageImage: (profileImage: string) => void,
    reset: () => void
}

export const useSignupStore = create<SignupState>((set) => ({
    step : 1,
    email: "",
    password: "",
    confirmPassword: "",
    nickname : "",
    profileImage : "",
    setStep : (step) => set({step}),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
    setNickname: (nickname) => set({ nickname }),
    setprofileImageImage: (profileImage) => set({ profileImage }),
    reset: () => set({
    step: 1,
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    profileImage: "",
  }),
}))
