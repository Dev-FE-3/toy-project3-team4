export interface IPlayListIemProps {
  id: number
  name: string
  access: string
}

export interface ITabMenuProps {
  onChangeTab: (tab: 'video' | 'playlist') => void
}

export interface IPlayList {
  id: number
  created_at: string
  user_id: number
  name: string
  access: string
}
