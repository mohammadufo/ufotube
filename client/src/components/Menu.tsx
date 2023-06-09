import styled from 'styled-components'
import UfoTube from '../img/logo.png'
import HomeIcon from '@mui/icons-material/Home'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined'
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { phone } from '../utils/responsive'
import { useSelector } from 'react-redux'

const Container = styled.div`
  flex: 1;
  min-width: 12rem;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  overflow: scroll;
  top: 0;
  padding: 18px 26px;
  transition: all 0.3s ease;

  ${phone({
    position: 'absolute',
    zIndex: '100',
    width: '13rem',
    flex: 2,
  })};
`

const Wrapper = styled.div``
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`

const Img = styled.img`
  height: 25px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`

const Login = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`

const Body = styled.div``

const Footer = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.soft};
  padding-top: 1rem;
`

const Menu = (props: any) => {
  const { darkMode, setDarkMode, showMenu } = props

  const { currentUser } = useSelector((state: any) => state.user)

  return (
    <Container
      className={`${showMenu ? 'visible-menu' : 'hidden-menu'} menu-container`}
    >
      <Wrapper>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logo>
            <Img src={UfoTube} />
            UFOTUBE
          </Logo>
        </Link>
        <Body>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Item>
              <HomeIcon />
              Home
            </Item>
          </Link>
          <Link
            to="/trends"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item>
              <ExploreOutlinedIcon />
              Explore
            </Item>
          </Link>
          <Link
            to="/subscriptions"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item>
              <SubscriptionsOutlinedIcon />
              Subscriptions
            </Item>
          </Link>

          <Hr />
          <Item>
            <VideoLibraryOutlinedIcon />
            Library
          </Item>
          <Item>
            <HistoryOutlinedIcon />
            History
          </Item>
          {!currentUser && (
            <>
              <Hr />
              <Login>
                Sign in to like videos, comment, and subscribe.
                <Link to="signin" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="outlined"
                    startIcon={<AccountCircleOutlinedIcon />}
                  >
                    SIGN IN
                  </Button>
                </Link>
              </Login>
            </>
          )}
          <Hr />
          <Title>BEST OF UFOTUBE</Title>
          <Link
            to="/tags/music"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item>
              <LibraryMusicOutlinedIcon />
              Music
            </Item>
          </Link>
          <Link
            to="/tags/sport"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item>
              <SportsBasketballOutlinedIcon />
              Sports
            </Item>
          </Link>
          <Link
            to="/tags/gaming"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item>
              <SportsEsportsOutlinedIcon />
              Gaming
            </Item>
          </Link>
          <Link
            to="/tags/movies"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item>
              <MovieOutlinedIcon />
              Movies
            </Item>
          </Link>
          <Link
            to="/tags/news"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Item>
              <ArticleOutlinedIcon />
              News
            </Item>
          </Link>
          <Hr />
          <Item>
            <SettingsOutlinedIcon />
            Settings
          </Item>
          <Item>
            <FlagOutlinedIcon />
            Report
          </Item>
          <Item>
            <HelpOutlineOutlinedIcon />
            Help
          </Item>
          <Item onClick={() => setDarkMode(!darkMode)}>
            <SettingsBrightnessOutlinedIcon />
            {darkMode ? 'Light' : 'Dark'} Mode
          </Item>
        </Body>
        <Footer>Muhammad UFO</Footer>
      </Wrapper>
    </Container>
  )
}

export default Menu
