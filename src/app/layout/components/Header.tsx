import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Search, ChevronLeft, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { HeaderType } from '../type/HeaderType'

const DEFAULT_HEADER_PATHS = ['/', '/follow', '/channel', '/settings']

const Header = () => {
  const navigate = useNavigate()
  const {pathname, search} = useLocation()

  const searchInputRef = useRef<HTMLInputElement>(null)
  const [type, setType] = useState<HeaderType>('default')
  const [previousType, setPreviousType] = useState<HeaderType>('default')
  const [searchQuery, setSearchQuery] = useState('')

  // URL이 변경될 때마다 헤더 타입 체크
  useEffect(() => {
    if (DEFAULT_HEADER_PATHS.includes(pathname)) {
      // 기본 페이지인 경우 default 타입으로 변경
      setType('default')
      setSearchQuery('')
    } else if (pathname === '/search') {
      // 검색 페이지에서는 searchInput 타입으로 변경
      const searchParams = new URLSearchParams(search)
      const query = searchParams.get('q')

      if (query) {
        const decodedQuery = decodeURIComponent(query)
        setSearchQuery(decodedQuery)
        if (searchInputRef.current) {
          searchInputRef.current.value = decodedQuery
        }
      }

      setType('searchInput')
    } else {
      // 검색 페이지가 아니면 searchIcon 타입으로 변경
      setType('searchIcon')
    }
  }, [pathname, search])

  // 검색창이 열릴 때마다 저장된 검색어 복원
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value = searchQuery
    }
  }, [type, searchQuery, pathname, search])

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
    const inputValue = searchInputRef.current?.value.trim() ?? ''

    // 검색 페이지이거나 input에 값이 있으면 searchIcon으로, 그 외에는 이전 타입으로
    setType(pathname === '/search' || inputValue ? 'searchIcon' : previousType)
  }

  // 엔터키 누르면 검색
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') {
      const inputValue = searchInputRef.current?.value.trim()
      if (!inputValue) {
        alert('검색어를 입력해주세요')
        return
      }

      if (inputValue !== searchQuery) {
        // 검색어가 변경됐을 때만 검색가능하도록
        setSearchQuery(inputValue)
        navigate(`/search?q=${encodeURIComponent(inputValue)}`)
      }
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
            name="search"
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="검색어를 입력하세요"
            autoComplete="off"
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
