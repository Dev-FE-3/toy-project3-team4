import SearchTypeEnum from './SearchTypeEnum'

interface SearchTypeButtonProps {
  currentType: SearchTypeEnum
  onTypeChange: (type: SearchTypeEnum) => void
}

export default SearchTypeButtonProps
