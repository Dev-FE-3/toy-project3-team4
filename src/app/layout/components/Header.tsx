import { Link, useNavigate } from 'react-router-dom'
import { Search, ChevronLeft, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import useHeaderStore from '@/shared/store/header/useHeaderStore'

const Header = () => {
  const navigate = useNavigate()

  const { type, prevType, setType } = useHeaderStore()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [showClearButton, setShowClearButton] = useState(false)

  // 헤더 type 바뀔때 검색어 삭제 아이콘 상태 변경
  useEffect(() => {
    setShowClearButton(false)
  }, [type])

  // 뒤로가기 버튼 이벤트 핸들러
  const handleBackClick = () => {
    if (type === 'search') {
      setType(prevType)
    } else {
      // window.history.state가 null이면 이전 페이지가 없는 것
      if (window.history.state === null) {
        setType(prevType)
      } else {
        navigate(-1)
      }
    }
  }

  // 검색 헤더 활성화 핸들러(검색 아이콘 클릭 시 입력창 활성화)
  const handleSearchClick = () => {
    setType('search')
  }

  // 검색어 지우기 이벤트 핸들러
  const handleClearSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = ''
      setShowClearButton(false)
    }
  }

  // 검색어 지우기 아이콘 표시 핸들러(검색어 길이가 1이상일때 아이콘 표시)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowClearButton(e.target.value.length > 0)
  }

  // 공통 헤더 스타일
  const baseHeaderClass = 'fixed top-0 mx-auto flex h-[56px] w-[430px] items-center border-b border-gray-light-medium bg-basic-white px-[15px]'

  // 공통 아이콘 스타일
  const iconProps = {
    size: 24,
    strokeWidth: 1.5,
    className: 'stroke-gray-dark',
  }

  const headerContent = {
    default: (
      <>
        <div>
          <Link to={'/'}>
            <img src="/image/logo/logo.svg" alt="로고" />
          </Link>
        </div>
        <div onClick={handleSearchClick} className="cursor-pointer">
          <Search {...iconProps} />
        </div>
      </>
    ),
    search: (
      <>
        <button onClick={handleBackClick} className="cursor-pointer">
          <ChevronLeft {...iconProps} />
        </button>
        <div className="relative flex-1">
          <input
            ref={searchInputRef}
            type="text"
            onChange={handleSearchChange}
            placeholder="검색어를 입력하세요"
            className="h-auto w-full rounded-full bg-gray-light-medium py-2 pl-4 pr-10 outline-none"
          />
          {showClearButton && (
            <button onClick={handleClearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              <X size={20} strokeWidth={1.5} className="stroke-gray-medium-dark" />
            </button>
          )}
        </div>
      </>
    ),
    detail: (
      <>
        <button onClick={handleBackClick} className="cursor-pointer">
          <ChevronLeft {...iconProps} />
        </button>
        <div onClick={handleSearchClick} className="cursor-pointer">
          <Search {...iconProps} />
        </div>
      </>
    ),
  }

  return <header className={`${baseHeaderClass} ${type === 'search' ? 'gap-2' : 'justify-between'}`}>{headerContent[type]}</header>
}

export default Header
