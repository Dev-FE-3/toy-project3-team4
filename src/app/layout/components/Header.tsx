import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, ChevronLeft, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { HeaderType } from '../type/HeaderType'

const DEFAULT_HEADER_PATHS = ['/', '/follow', '/channel', '/settings']

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [type, setType] = useState<HeaderType>('default')
  const [previousType, setPreviousType] = useState<HeaderType>('default')

  // URL이 변경될 때마다 헤더 타입 체크
  useEffect(() => {
    if (DEFAULT_HEADER_PATHS.includes(location.pathname)) {
      setType('default')
    }

    // 검색 페이지에서 뒤로가기했을 때 검색어 복원
    if (location.pathname === '/search' && searchInputRef.current) {
      const searchParams = new URLSearchParams(location.search)
      const query = searchParams.get('q')
      if (query) {
        searchInputRef.current.value = decodeURIComponent(query)
        setType('searchInput')
      }
    }
  }, [location.pathname, location.search])

  // 뒤로가기 버튼 이벤트 핸들러
  const handleBackClick = () => {
    if (searchInputRef.current?.value === '') {
      setType(previousType)
    } else {
      navigate(-1)
    }
  }

  // 검색 헤더 활성화 핸들러(검색 아이콘 클릭 시 입력창 활성화)
  const handleSearchClick = () => {
    setPreviousType(type)
    setType('searchInput')
  }

  // 검색창 닫기 이벤트 핸들러
  const handleSearchInputHidden = () => {
    if (searchInputRef.current?.value === '') {
      setType(previousType)
    } else {
      setType('searchIcon')
    }
  }

  // 엔터키 누르면 검색
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return // 한글 검색어 입력 시 이벤트 두번 실행되는 상황 방지...
    if (e.key === 'Enter') {
      e.preventDefault()
      const searchQuery = searchInputRef.current?.value.trim()
      if (!searchQuery) return

      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
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
    searchInput: (
      <>
        <button onClick={handleBackClick} className="cursor-pointer">
          <ChevronLeft {...iconProps} />
        </button>
        <div className="relative flex-1">
          <input
            ref={searchInputRef}
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
            className="h-auto w-full rounded-full bg-gray-light-medium py-2 pl-4 pr-10 outline-none"
          />
          <button onClick={handleSearchInputHidden} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            <X size={20} strokeWidth={1.5} className="stroke-gray-medium-dark" />
          </button>
        </div>
      </>
    ),
    searchIcon: (
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

  return <header className={`${baseHeaderClass} ${type === 'searchInput' ? 'gap-2' : 'justify-between'}`}>{headerContent[type]}</header>
}

export default Header
