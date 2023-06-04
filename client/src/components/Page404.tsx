import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Span = styled.span`
  font-size: 4rem;
  font-weight: 600;
`

const Title = styled.h1`
  font-size: 15vh;
`
const H3 = styled.h3``

const Page404 = () => {
  return (
    <Container>
      <Title>:(</Title>
      <br />
      <h2>
        A <Span>404</Span> error occured, Page not found, check the URL and try
        again.
      </h2>
      <br />
      <H3>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Return to home
        </Link>
      </H3>
    </Container>
  )
}

export default Page404
