// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import styled from 'styled-components'
import Comment from './Comment'
import { TextField, IconButton, Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useEffect, useState } from 'react'
import { publicService } from '../services/publicRequest'
import { enqueueSnackbar } from 'notistack'

const Container = styled.div`
  padding-bottom: 5rem;
`

const NewComment = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
`
const Comments = (props: {
  videoId: string | undefined
  img: string | undefined
  name: string | undefined
}) => {
  const [commentList, setCommentList] = useState([])
  const [text, setText] = useState('')

  const fetchComments = async () => {
    try {
      const res = await publicService.api(
        'GET',
        `/comments/${props.videoId}`,
        {},
        {}
      )
      setCommentList(res.data)
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [props.videoId])

  const handleAddComment = async (e: any) => {
    e.preventDefault()
    try {
      const res = await publicService.api(
        'POST',
        '/comments',
        {},
        {
          videoId: props.videoId,
          desc: text,
        }
      )
      setCommentList([...commentList, res.data])
      enqueueSnackbar('your comment is added! 😇', {
        variant: 'success',
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
      })
    } catch (err: any) {
      enqueueSnackbar(err, {
        variant: 'error',
        anchorOrigin: {
          horizontal: 'top',
          vertical: 'center',
        },
      })
    }
  }

  return (
    <Container>
      <NewComment>
        <Avatar src={props.img}>
          {props?.name?.split('')[0].toUpperCase() || '?'}
        </Avatar>
        <TextField
          onChange={(e) => setText(e.target.value)}
          fullWidth
          label="add comment ..."
          variant="standard"
        />
        <IconButton onClick={handleAddComment}>
          <SendIcon />
        </IconButton>
      </NewComment>
      {commentList.map((comment) => (
        <div key={comment._id}>
          <Comment commentObj={comment} />
        </div>
      ))}
    </Container>
  )
}

export default Comments
