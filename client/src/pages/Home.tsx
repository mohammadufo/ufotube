import styled from 'styled-components'
import CardComponent from '../components/CardComponent'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;

  width: 100%;
  height: 100vh !important;
  overflow-y: scroll !important;
  margin-bottom: 5rem;
  padding-bottom: 10rem;
`

const Home = () => {
  return (
    <Container>
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
      <CardComponent />
    </Container>
  )
}

export default Home
