import { EllipsisVertical, ListVideo } from 'lucide-react'

interface IPlayListIemProps {
  id: number
  name: string
  access: string
  created_at: string
  count: number
}

const PlayListItem: React.FC<IPlayListIemProps> = ({
  id = 40,
  name = 'React Redux Tutorial',
  access = 'true',
  created_at = '2025-04-13T08:48:26.377613+00:00',
  count = 6,
}) => {
  return (
    <main className="mb-[40px] flex h-[120px] justify-between gap-[15px]">
      <section className="relative w-[180px]">
        <div className="ml-2 mr-2 h-full rounded-[5px] bg-[#E0E0E2]"></div>
        <img className="absolute top-[8px] w-[180px] rounded-[5px]" src="https://i.ytimg.com/vi/W-1DWS-lZ9c/hqdefault.jpg" />
        <div className="absolute bottom-[-15px] right-[9px] flex w-[48px] justify-center gap-[4px] rounded-[20px] bg-gray-900/40 px-[8px] py-[3px] text-white">
          <ListVideo />
          <p>{count}</p>
        </div>
      </section>

      <section className="mt-[5px] flex w-[205px] justify-between gap-[10px]">
        <h3 className="flex flex-col gap-[8px]">
          <h3 className="text-[14px] font-semibold">{name}</h3>
          <h3 className="text-[12px] text-gray-medium-dark">{access === 'true' ? '공개' : '비공개'}</h3>
        </h3>
        <EllipsisVertical size={15} strokeWidth={2} className="stroke-gray-dark" />
      </section>
    </main>
  )
}

export default PlayListItem
