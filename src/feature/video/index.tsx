import { useParams } from 'react-router-dom'
import DetailedVideo from './components/DetailedVideo'

const Video: React.FC = () => {
  const id = useParams<{ id: string }>().id ?? ''

  return (
    <main className="h-dvh w-full">
      <DetailedVideo id={id} />
    </main>
  )
}
export default Video
