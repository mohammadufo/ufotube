import styled from 'styled-components'
import Comment from './Comment'
import { TextField, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const Container = styled.div`
  padding-bottom: 5rem;
`

const NewComment = styled.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`

const Comments = () => {
  return (
    <Container>
      <NewComment>
        <Avatar src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
        <TextField fullWidth label="add comment ..." variant="standard" />
        <IconButton>
          <SendIcon />
        </IconButton>
      </NewComment>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </Container>
  )
}

export default Comments
