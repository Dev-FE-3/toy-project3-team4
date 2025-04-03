import { SunMoon, UsersRound, Settings2, Headset, Handshake } from 'lucide-react'
import { useState } from 'react'

const Settings = () => {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <ul className="ml-[15px] mr-[15px]">
      <li className="flex h-[50px] items-center justify-between gap-[15px]">
        <div className="flex items-center gap-[15px]">
          <SunMoon />
          <p>다크 모드</p>
        </div>
        <button
          onClick={() => setIsToggled(!isToggled)}
          className="flex h-[20px] w-[40px] items-center rounded-full bg-gray-light p-[2px] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div
            className={`h-[16px] w-[16px] transform rounded-full bg-basic-white shadow-md transition-transform ${isToggled ? 'translate-x-[20px] bg-blue-500' : 'translate-x-0'}`}
          />
        </button>
      </li>
      <li className="flex h-[50px] items-center gap-[15px]">
        <UsersRound />
        <p>팔로우 목록 </p>
      </li>
      <li className="flex h-[50px] items-center gap-[15px]">
        <Settings2 />
        <p>계정 설정</p>
      </li>
      <li className="flex h-[50px] items-center gap-[15px]">
        <Headset />
        <p>고객센터</p>
      </li>
      <li className="flex h-[50px] items-center gap-[15px]">
        <Handshake />
        <p>약관</p>
      </li>
    </ul>
  )
}

export default Settings
