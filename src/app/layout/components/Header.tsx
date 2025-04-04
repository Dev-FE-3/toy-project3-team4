import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'

const Header = () => {
  return (
    <header className="fixed top-0 mx-auto flex h-[56px] w-[430px] items-center justify-between border-b border-gray-light-medium bg-basic-white px-[15px]">
      <div>
        <Link to={'/'}>
          <img src="/image/logo/logo.svg" alt="로고" />
        </Link>
      </div>
      <div
        onClick={() => {
          alert('click')
        }}
      >
        <Search size={20} className="cursor-pointer stroke-gray-dark" strokeWidth={1.25} />
      </div>
    </header>
  )
}

export default Header
