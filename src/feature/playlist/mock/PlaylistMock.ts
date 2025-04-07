// mock/playlistMock.ts
export const PlaylistMock = {
  id: '1',
  title: '내 플레이리스트',
  ownerName: '홍길동',
  isPublic: true,
  videos: [
    {
      id: 'dQw4w9WgXcQ',
      title: 'Rick Astley - Never Gonna Give You Up',
      thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      views: 123456,
      createdAt: '2024-04-08T10:00:00Z',
    },
    {
      id: 'M7FIvfx5J10',
      title: 'Epic Sax Guy 10 Hours',
      thumbnailUrl: 'https://img.youtube.com/vi/M7FIvfx5J10/hqdefault.jpg',
      views: 999999,
      createdAt: '2024-04-07T12:30:00Z',
    },
  ],
}
