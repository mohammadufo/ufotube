import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Test from '../img/test.jpg'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Avatar } from '@mui/material'

const Container = styled.div`
  width: ${(props) => props.type !== 'sm' && '360px'};
  margin-bottom: ${(props) => (props.type === 'sm' ? '10px' : '45px')};
  cursor: pointer;
  display: ${(props) => props.type === 'sm' && 'flex'};
  gap: 10px;
`

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === 'sm' ? '120px' : '202px')};
  background-color: #999;
  flex: 1;
`

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== 'sm' && '16px'};
  gap: 12px;
  flex: 1;
`

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === 'sm' && 'none'};
`

const Texts = styled.div``

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  /* margin: 9px 0px; */
`

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`

const CardWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 1rem;
`
const AvatarImg = styled.div``
const Desc = styled.div``

const CardComponent = ({ type }) => {
  return (
    <>
      {type === 'sm' ? (
        <Link to="/video/test" style={{ textDecoration: 'none' }}>
          <Container type={type}>
            <Image type={type} src={Test} />
            <Details type={type}>
              <ChannelImage
                type={type}
                src="https://avatars.githubusercontent.com/u/90573543?v=4"
              />
              <Texts>
                <Title>Test Video</Title>
                <ChannelName>Muhammad UFO</ChannelName>
                <Info>660,908 views • 1 day ago</Info>
              </Texts>
            </Details>
          </Container>
        </Link>
      ) : (
        <>
          <Card sx={{ width: 300, height: 240 }}>
            <CardMedia sx={{ height: 140 }} image={Test} title="green iguana" />
            <CardContent>
              <CardContent sx={{ padding: 0 }}>
                <CardWrapper>
                  <AvatarImg>
                    <Avatar
                      src="https://avatars.githubusercontent.com/u/90573543?v=4"
                      aria-label="recipe"
                    >
                      R
                    </Avatar>
                  </AvatarImg>

                  <Desc>
                    <Title>Test Video</Title>
                    <ChannelName>Muhammad UFO</ChannelName>
                    <Info>660,908 views • 1 day ago</Info>
                  </Desc>
                </CardWrapper>
              </CardContent>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}

export default CardComponent
