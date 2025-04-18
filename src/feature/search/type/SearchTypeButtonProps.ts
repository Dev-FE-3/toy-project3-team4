import { SearchType } from './SearchType'

export type SearchTypeButtonProps = {
  currentType: SearchType
  onTypeChange: (type: SearchType) => void
}
