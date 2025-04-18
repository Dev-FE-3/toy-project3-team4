import { create, StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'

export const createDevtoolsStore = <T>(initializer: StateCreator<T, [['zustand/devtools', never]], [], T>, storeName: string) =>
  create<T>()(devtools(initializer, { name: storeName }))
