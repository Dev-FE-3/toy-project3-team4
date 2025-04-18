import useThemeStore from '@/shared/store/theme/useThemeStore'
import { SunMoon, UsersRound, Settings2, Headset, Handshake } from 'lucide-react'

const Settings = () => {
  const { isDark, setToggleTheme } = useThemeStore()
  return (
    <ul>
      <li className="flex h-[50px] items-center justify-between gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <SunMoon size={24} className="stroke-gray-dark" strokeWidth={1.25} />
          <p>다크 모드</p>
        </div>
        <button
          onClick={setToggleTheme}
          className="flex h-[20px] w-[40px] items-center rounded-full bg-gray-light p-[2px] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div
            className={`h-[16px] w-[16px] transform rounded-full bg-basic-white shadow-md transition-transform ${
              isDark ? 'translate-x-[20px] bg-blue-500' : 'translate-x-0'
            }`}
          />
        </button>
      </li>
      <li className="flex h-[50px] items-center gap-[15px]">
        <UsersRound size={24} className="stroke-gray-dark" strokeWidth={1.25} />
        <p>팔로우 목록 </p>
      </li>
      <li className="flex h-[50px] items-center gap-[15px]">
        <Settings2 size={24} className="stroke-gray-dark" strokeWidth={1.25} />
        <p>계정 설정</p>
      </li>
      <li className="flex h-[50px] items-center gap-[15px]">
        <Headset size={24} className="stroke-gray-dark" strokeWidth={1.25} />
        <p>고객센터</p>
      </li>
      <li className="flex h-[50px] items-center gap-[15px]">
        <Handshake size={24} className="stroke-gray-dark" strokeWidth={1.25} />
        <p>약관</p>
      </li>
    </ul>
  )
}

export default Settings
