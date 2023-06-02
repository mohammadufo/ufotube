import styled from 'styled-components'
import { Skeleton } from '@mui/material'
import { phone } from '../utils/responsive'

const Container = styled.div`
  display: flex;
  gap: 24px;
  height: 100vh !important;
  overflow-y: scroll !important;
  padding: 22px 44px;
  width: 100%;
`

const Content = styled.div`
  flex: 5;
`

const Recommendation = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  height: 80vh !important;
  overflow-y: scroll !important;

  ${phone({ display: 'none' })}
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 2rem;
  margin-top: 1rem;
`
const Img = styled.div``
const Desc = styled.div``

const VideoLoading = () => {
  return (
    <Container>
      <Content>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={400}
        />
        <Footer>
          <Img>
            <Skeleton variant="circular" width={50} height={50} />
          </Img>
          <Desc>
            <Skeleton variant="text" width={250} />
            <Skeleton variant="text" width={250} />
            <Skeleton variant="text" width="100%" />
          </Desc>
        </Footer>
      </Content>

      <Recommendation>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={100}
        />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={100}
        />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
      </Recommendation>
    </Container>
  )
}

export default VideoLoading
