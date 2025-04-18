export interface IPlayListIemProps {
  id: number
  name: string
  access: string
}

export interface ITabMenuProps {
  onChangeTab: (tab: 'video' | 'playlist') => void
}
