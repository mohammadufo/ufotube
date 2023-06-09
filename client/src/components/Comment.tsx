import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { publicService } from '../services/publicRequest'
import { commentObj } from '../types/public'
import { format } from 'timeago.js'
import Avatar from '@mui/material/Avatar'

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`

const Text = styled.span`
  font-size: 14px;
`

const Comment = (props: { commentObj: commentObj }) => {
  const [user, setUser] = useState<any>({})

  const fetchUser = async () => {
    try {
      const res: any = await publicService.api(
        'GET',
        `/users/find/${props.commentObj.userId}`,
        {},
        {}
      )
      setUser(res.data)
      console.log(res.data)
    } catch (err: any) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [props.commentObj.userId])

  return (
    <Container>
      <Avatar src={user?.img}>{user?.name?.split('')[0].toUpperCase()}</Avatar>
      <Details>
        <Name>
          {user.name} <Date>{format(props.commentObj.createdAt)}</Date>
        </Name>
        <Text>{props.commentObj.desc}</Text>
      </Details>
    </Container>
  )
}

export default Comment
