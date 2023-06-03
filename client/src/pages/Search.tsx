import styled from 'styled-components'
import CardComponent from '../components/CardComponent'
import { useEffect, useState } from 'react'
import { publicService } from '../services/publicRequest'
import HomeLoading from '../components/HomeLoading'
import { Video } from '../types/public'
import { useOutletContext } from 'react-router-dom'

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

const Search = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [search] = useOutletContext()

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await publicService.api(
        'GET',
        `/videos/search?q=${search}`,
        {},
        {}
      )
      setVideos(res.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [search])

  return (
    <Container>
      {loading ? (
        <HomeLoading />
      ) : (
        <>
          {videos?.map((video: Video) => (
            <div key={video._id}>
              <CardComponent video={video} />
            </div>
          ))}
        </>
      )}
    </Container>
  )
}

export default Search
