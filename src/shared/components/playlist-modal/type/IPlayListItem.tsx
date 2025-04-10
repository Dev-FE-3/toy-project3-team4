export interface IPlayListItem {
  id: number
  name: string
  access: string
  videolist: [
    {
      video_id: string
    },
  ]
}
