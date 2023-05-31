import Skeleton from '@mui/material/Skeleton'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  /* align-items: start; */
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  height: 60vh;
`
const CardContainer = styled.div`
  height: max-content;
`
const Card = styled.div``
const Footer = styled.div`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-around;
  margin-top: 1rem;
`
const Img = styled.div``
const Desc = styled.div``

function HomeLoading() {
  return (
    <Container>
      <CardContainer>
        <Card>
          <Skeleton variant="rectangular" width={300} height={125} />
          <Footer>
            <Img>
              <Skeleton variant="circular" width={40} height={40} />
            </Img>
            <Desc>
              <Skeleton variant="text" width={220} />
              <Skeleton variant="text" width={220} />
            </Desc>
          </Footer>
        </Card>
      </CardContainer>
      <CardContainer>
        <Card>
          <Skeleton variant="rectangular" width={300} height={125} />
          <Footer>
            <Img>
              <Skeleton variant="circular" width={40} height={40} />
            </Img>
            <Desc>
              <Skeleton variant="text" width={220} />
              <Skeleton variant="text" width={220} />
            </Desc>
          </Footer>
        </Card>
      </CardContainer>
      <CardContainer>
        <Card>
          <Skeleton variant="rectangular" width={300} height={125} />
          <Footer>
            <Img>
              <Skeleton variant="circular" width={40} height={40} />
            </Img>
            <Desc>
              <Skeleton variant="text" width={220} />
              <Skeleton variant="text" width={220} />
            </Desc>
          </Footer>
        </Card>
      </CardContainer>
      <CardContainer>
        <Card>
          <Skeleton variant="rectangular" width={300} height={125} />
          <Footer>
            <Img>
              <Skeleton variant="circular" width={40} height={40} />
            </Img>
            <Desc>
              <Skeleton variant="text" width={220} />
              <Skeleton variant="text" width={220} />
            </Desc>
          </Footer>
        </Card>
      </CardContainer>
      <CardContainer>
        <Card>
          <Skeleton variant="rectangular" width={300} height={125} />
          <Footer>
            <Img>
              <Skeleton variant="circular" width={40} height={40} />
            </Img>
            <Desc>
              <Skeleton variant="text" width={220} />
              <Skeleton variant="text" width={220} />
            </Desc>
          </Footer>
        </Card>
      </CardContainer>
      <CardContainer>
        <Card>
          <Skeleton variant="rectangular" width={300} height={125} />
          <Footer>
            <Img>
              <Skeleton variant="circular" width={40} height={40} />
            </Img>
            <Desc>
              <Skeleton variant="text" width={220} />
              <Skeleton variant="text" width={220} />
            </Desc>
          </Footer>
        </Card>
      </CardContainer>
    </Container>
  )
}

export default HomeLoading
