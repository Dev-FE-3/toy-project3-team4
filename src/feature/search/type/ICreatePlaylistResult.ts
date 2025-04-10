type CreatePlaylistResultType = 'SUCCESS' | 'USER_NOT_FOUND' | 'PLAYLIST_EXISTS' | 'SAVE_FAILED'

export interface CreatePlaylistResult {
  type: CreatePlaylistResultType
  message: string
}
