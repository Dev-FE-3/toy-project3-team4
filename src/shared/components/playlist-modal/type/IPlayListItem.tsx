export interface IPlayListItem {
  id: number
  name: string
  access: boolean
  videolist: [
    {
      video_id: string
    },
  ]
}
