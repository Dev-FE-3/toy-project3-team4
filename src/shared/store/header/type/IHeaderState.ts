type HeaderType = 'default' | 'search' | 'detail'

export interface IHeaderState {
  type: HeaderType
  prevType: HeaderType
  setType: (type: HeaderType) => void
}
