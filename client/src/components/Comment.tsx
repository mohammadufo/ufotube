import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { publicService } from '../services/publicRequest'
import { commentObj } from '../types/public'
import { format } from 'timeago.js'

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
  const [user, setUser] = useState({})

  const fetchUser = async () => {
    try {
      const res = await publicService.api(
        'GET',
        `/users/find/${props.commentObj.userId}`,
        {},
        {}
      )
      setUser(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [props.commentObj.userId])

  return (
    <Container>
      <Avatar src={user.img} />
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
