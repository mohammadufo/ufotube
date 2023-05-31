import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Avatar, CardActionArea, Box } from '@mui/material'
import { Video } from '../types/public'
import { format } from 'timeago.js'
import { useEffect, useState } from 'react'
import { publicService } from '../services/publicRequest'

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 3px 0px;
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
const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const CardComponent = (props: { type?: string; video: Video }) => {
  const [user, setUser] = useState({})

  const fetchData = async () => {
    try {
      const res = await publicService.api(
        'GET',
        `users/find/${props.video.userId}`,
        {},
        {}
      )

      setUser(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [props?.video?.userId])

  return (
    <>
      {props.type === 'sm' ? (
        <Link
          to="/video/test"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <CardActionArea>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={''}
                alt="Live from space album cover"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <CardWrapper>
                    <Desc>
                      <Title>Test Video</Title>
                      <ChannelName>Muhammad UFO</ChannelName>
                      <Info>660,908 views </Info>
                      <Info>1 day ago </Info>
                    </Desc>
                  </CardWrapper>
                </CardContent>
              </Box>
            </Card>
          </CardActionArea>
        </Link>
      ) : (
        <>
          <Card sx={{ width: 300, height: 240 }}>
            <Link
              to={`/video/${props.video._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <CardActionArea>
                <CardMedia
                  sx={{ height: 140 }}
                  image={props.video.imgUrl}
                  title="green iguana"
                />
                <CardContent>
                  <CardContent sx={{ padding: 0 }}>
                    <CardWrapper>
                      <AvatarImg>
                        <Avatar src={user.img} aria-label="recipe">
                          {user.name}
                        </Avatar>
                      </AvatarImg>

                      <Desc>
                        <Title>{props.video.title}</Title>
                        <ChannelName>{user.name}</ChannelName>
                        <Info>
                          {props.video.views} views •
                          {format(props.video.createdAt)}
                        </Info>
                      </Desc>
                    </CardWrapper>
                  </CardContent>
                </CardContent>
              </CardActionArea>
            </Link>
          </Card>
        </>
      )}
    </>
  )
}

export default CardComponent
