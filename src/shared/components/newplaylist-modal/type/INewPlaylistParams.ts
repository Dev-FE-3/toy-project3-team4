export interface INewPlaylistParams {
  userId: number
  title: string
  access: string
  videoId?: string // 선택적: 첫 영상 추가할 경우
}
