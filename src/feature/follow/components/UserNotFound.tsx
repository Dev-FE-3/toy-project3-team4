import { Link } from 'react-router-dom'

const UserNotFound = () => {
  return (
    <div className="flex h-[calc(100vh-112px)] flex-col items-center justify-center">
      <img src="/image/download/empty-user.svg" alt="로그인 후 이용해주세요" />
      <p className="mt-6 font-light text-gray-medium">
        서비스 이용을 위해{' '}
        <Link to="/login" className="font-normal text-blue-400 transition-colors hover:text-blue-500">
          로그인
        </Link>
        이 필요해요
      </p>
    </div>
  )
}

export default UserNotFound
