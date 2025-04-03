import React from 'react'
import VideoItem from './components/VideoItem'
import { IVideoItem } from './type/IvideoItem'

const videoList: IVideoItem[] = [
  {
    id: '1',
    thumbnail: '/path/to/image1.jpg',
    title: '이 노래 너무 좋은걸? 나만 들을 수 없지 | 잔잔한 피...',
    views: 340,
    uploadedTime: '2시간 전',
  },
  {
    id: '2',
    thumbnail: '/path/to/image2.jpg',
    title: '이 노래 너무 좋은걸? 나만 들을 수 없지 | 잔잔한 피...',
    views: 340,
    uploadedTime: '2시간 전',
  },
  {
    id: '3',
    thumbnail: '/path/to/image3.jpg',
    title: '이 노래 너무 좋은걸? 나만 들을 수 없지 | 잔잔한 피...',
    views: 340,
    uploadedTime: '2시간 전',
  },
]

const PlaylistPage: React.FC = () => {
  return (
    <div className="bg-white">
      {videoList.map((video) => (
        <VideoItem key={video.id} {...video} />
      ))}
    </div>
  )
}

export default PlaylistPage
