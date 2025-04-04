import { create } from 'zustand'
import { IHeaderState } from './type/IHeaderState'

export const useHeaderStore = create<IHeaderState>((set) => ({
  type: 'default',
  prevType: 'default',
  setType: (type) =>
    set((state) => ({
      type,
      prevType: state.type,
    })),
}))
export default useHeaderStore
