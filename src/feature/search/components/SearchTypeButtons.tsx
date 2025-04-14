import { memo } from 'react'
import SearchTypeButtonProps from '../type/ISearchTypeButtonProps'

const SearchTypeButtons = memo(({ currentType, onTypeChange }: SearchTypeButtonProps) => {
  return (
    <div className="flex gap-2 px-[15px] pt-[15px]">
      <button
        onClick={() => onTypeChange('video')}
        className={`${currentType === 'video' ? 'bg-gray-dark text-basic-white' : 'bg-gray-light'} cursor-pointer rounded-full px-3 py-[6px] text-sm`}
      >
        동영상
      </button>
      <button
        onClick={() => onTypeChange('playlist')}
        className={`${currentType === 'playlist' ? 'bg-gray-dark text-basic-white' : 'bg-gray-light'} cursor-pointer rounded-full px-3 py-[6px] text-sm`}
      >
        플레이리스트
      </button>
    </div>
  )
})

export default SearchTypeButtons
