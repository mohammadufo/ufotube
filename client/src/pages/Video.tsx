import styled from 'styled-components'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined'
import Comments from '../components/Comments'
import CardComponent from '../components/CardComponent'
import { phone } from '../utils/responsive'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { publicService } from '../services/publicRequest'
import { useEffect, useState } from 'react'
import {
  disLike,
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
} from '../redux/videoSlice'
import { format } from 'timeago.js'
import VideoLoading from '../components/VideoLoading'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { Avatar, IconButton, Button as MuiButton } from '@mui/material'
import { subscription } from '../redux/userSlice'

const Container = styled.div`
  display: flex;
  gap: 24px;
  height: 100vh !important;
  overflow-y: scroll !important;
  padding: 22px 44px;
`

const Content = styled.div`
  flex: 5;
`
const VideoWrapper = styled.div``

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
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
const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`

const ChannelName = styled.span`
  font-weight: 500;
`

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`

const Description = styled.p`
  font-size: 14px;
`

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`

const Video = () => {
  const [channel, setChannel] = useState({})

  const { currentUser } = useSelector((state) => state.user)
  const { currentVideo, loading } = useSelector((state) => state.video)

  const dispatch = useDispatch()

  const { id } = useParams()
  const fetchData = async () => {
    try {
      dispatch(fetchStart())
      const videoRes = await publicService.api(
        'GET',
        `/videos/find/${id}`,
        {},
        {}
      )
      const channelRes = await publicService.api(
        'GET',
        `/users/find/${videoRes?.data?.userId}`,
        {},
        {}
      )
      // console.log('video res ---->', videoRes.data)
      console.log('channel res ---->', channelRes.data)
      dispatch(fetchSuccess(videoRes.data))
      setChannel(channelRes.data)
    } catch (err) {
      console.log(err)
      dispatch(fetchFailure())
    }
  }

  useEffect(() => {
    fetchData()
  }, [id, dispatch])

  const handleLike = async () => {
    await publicService.api('PUT', `/users/like/${currentVideo._id}`, {}, {})
    dispatch(like(currentUser._id))
  }
  const handleDisLike = async () => {
    await publicService.api('PUT', `/users/dislike/${currentVideo._id}`, {}, {})
    dispatch(disLike(currentUser._id))
  }

  const handleSubscribe = async () => {
    currentUser?.subscribedUsers?.includes(channel._id)
      ? await publicService.api('PUT', `/users/sub/${channel._id}`, {}, {})
      : await await publicService.api(
          'PUT',
          `/users/unsub/${channel._id}`,
          {},
          {}
        )

    dispatch(subscription(channel._id))
  }

  return (
    <Container>
      {loading ? (
        <VideoLoading />
      ) : (
        <>
          <Content>
            <VideoWrapper>
              <iframe
                width="100%"
                height="auto"
                src={currentVideo.videoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </VideoWrapper>

            <Title>{currentVideo.title}</Title>
            <Details>
              <Info>
                {currentVideo.views} views • {format(currentVideo.createdAt)}
              </Info>
              <Buttons>
                <Button>
                  <IconButton onClick={handleLike}>
                    {currentVideo?.likes.includes(currentUser?._id) ? (
                      <ThumbUpIcon color="success" />
                    ) : (
                      <ThumbUpOutlinedIcon />
                    )}
                  </IconButton>
                  {currentVideo.likes?.length}
                </Button>
                <Button>
                  <IconButton onClick={handleDisLike}>
                    {currentVideo?.disLikes.includes(currentUser?._id) ? (
                      <ThumbDownAltIcon color="error" />
                    ) : (
                      <ThumbDownOffAltOutlinedIcon />
                    )}
                  </IconButton>
                  Dislike
                </Button>
                <Button>
                  <IconButton>
                    <ReplyOutlinedIcon />
                  </IconButton>
                  Share
                </Button>
                <Button>
                  <IconButton>
                    <AddTaskOutlinedIcon />
                  </IconButton>
                  Save
                </Button>
              </Buttons>
            </Details>
            <Hr />
            <Channel>
              <ChannelInfo>
                <Avatar src={channel.img}>
                  {currentUser?.name?.split('')[0].toUpperCase()}
                </Avatar>
                <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>
                    {channel.subscribers} subscribers
                  </ChannelCounter>
                  <Description>{currentVideo.desc}</Description>
                </ChannelDetail>
              </ChannelInfo>

              <MuiButton
                onClick={handleSubscribe}
                variant={
                  currentUser?.subscribedUsers?.includes(channel._id)
                    ? 'text'
                    : 'contained'
                }
                color={
                  currentUser?.subscribedUsers?.includes(channel._id)
                    ? 'success'
                    : 'error'
                }
                sx={{ height: 'max-content' }}
              >
                {currentUser?.subscribedUsers?.includes(channel._id)
                  ? 'SUBSCRIBED'
                  : 'SUBSCRIBE'}
              </MuiButton>
            </Channel>
            <Hr />
            <Comments />
          </Content>
          <Recommendation>
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
            <CardComponent type="sm" />
          </Recommendation>
        </>
      )}
    </Container>
  )
}

export default Video
