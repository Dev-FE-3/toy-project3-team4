type HeaderType = 'basic' | 'search' | 'detail'

export interface IHeaderState {
  type: HeaderType
  prevType: HeaderType
  setType: (type: HeaderType) => void
}
