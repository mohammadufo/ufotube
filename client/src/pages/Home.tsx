import styled from 'styled-components'
import CardComponent from '../components/CardComponent'
import { useEffect, useState } from 'react'
import { publicService } from '../services/publicRequest'
import HomeLoading from '../components/HomeLoading'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;

  width: 100%;
  height: 100vh !important;
  overflow-y: scroll !important;
  margin-bottom: 5rem;
  padding-bottom: 10rem;
  padding: 22px 44px;
`

const Home = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await publicService.api('GET', '/videos/random', {}, {})
      setVideos(res.data)
      console.log(res.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container>
      {loading ? (
        <HomeLoading />
      ) : (
        <>
          {videos?.map((video) => (
            <div key={video._id}>
              <CardComponent />
            </div>
          ))}
        </>
      )}
    </Container>
  )
}

export default Home
