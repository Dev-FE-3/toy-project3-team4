import { create } from 'zustand'
import { IHeaderState } from './type/IHeaderState'

export const useHeaderStore = create<IHeaderState>((set) => ({
  type: 'basic',
  prevType: 'basic',
  setType: (type) =>
    set((state) => ({
      type,
      prevType: state.type,
    })),
}))
export default useHeaderStore
