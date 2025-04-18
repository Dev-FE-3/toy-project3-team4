export const PlaylistCreationStatus = {
  USER_NOT_FOUND: {
    type: 'USER_NOT_FOUND',
    message: '로그인 후 이용해주세요.',
  },
  PLAYLIST_EXISTS: {
    type: 'PLAYLIST_EXISTS',
    message: '이미 존재하는 플레이리스트입니다.',
  },
  SAVE_FAILED: {
    type: 'SAVE_FAILED',
    message: '플레이리스트 저장에 실패했습니다.',
  },
  SUCCESS: {
    type: 'SUCCESS',
    message: '플레이리스트가 정상적으로 저장되었습니다.',
  },
} as const

export type PlaylistCreationResult = (typeof PlaylistCreationStatus)[keyof typeof PlaylistCreationStatus]
