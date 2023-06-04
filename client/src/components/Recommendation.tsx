import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { publicService } from '../services/publicRequest'
import { Video } from '../types/public'
import { phone } from '../utils/responsive'
import CardComponent from './CardComponent'

const Container = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  height: 80vh !important;
  overflow-y: scroll !important;

  ${phone({ display: 'none' })}
`

const Recommendation = (props: { tags: string }) => {
  const [videos, setVideos] = useState([])

  const { tags } = props
  useEffect(() => {
    const fetchVideos = async () => {
      const res: any = await publicService.api(
        'GET',
        `/videos/tags?tags=${tags}`,
        {},
        {}
      )
      setVideos(res.data)
    }
    fetchVideos()
  }, [tags])

  return (
    <Container>
      {videos.map((video: Video) => (
        <CardComponent type="sm" key={video._id} video={video} />
      ))}
    </Container>
  )
}

export default Recommendation
