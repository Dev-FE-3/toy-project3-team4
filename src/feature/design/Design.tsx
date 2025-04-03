import useThemeStore from '@/shared/store/theme/useThemeStore'

const Design = () => {
  const { isDark, toggleTheme } = useThemeStore()

  return (
    <>
      <p className="bg-basic-white text-basic-black">bg-basic-white text-basic-black 입니다</p>
      <p className="bg-basic-black text-basic-white">bg-basic-black text-basic-white 입니다</p>
      <p className="text-gray-light">text-gray-light 입니다</p>
      <p className="text-gray-light-medium">text-gray-light-medium 입니다</p>
      <p className="text-gray-medium">text-gray-medium 입니다</p>
      <p className="text-gray-medium-dark">text-gray-medium-dark 입니다</p>
      <p className="text-gray-dark">text-gray-dark 입니다</p>
      <p className="text-gray-dark-reply">text-gray-dark-reply 입니다</p>
      <p className="text-main-primary">text-main-primary 입니다</p>
      <p className="text-main-warning">text-main-warning 입니다</p>
      <p className="text-main-success">text-main-success 입니다</p>
      <button onClick={toggleTheme} className="px-4 py-2 bg-blue-500 text-white rounded">
        {isDark ? '라이트 모드' : '다크 모드'}
      </button>
    </>
  )
}

export default Design
