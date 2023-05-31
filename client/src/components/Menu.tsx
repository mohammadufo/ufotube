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
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import SettingsBrightnessOutlinedIcon from '@mui/icons-material/SettingsBrightnessOutlined'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { phone } from '../utils/responsive'

const Container = styled.div`
  flex: 1;
  min-width: 10rem;
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
    // left: '-13rem',
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

const Menu = ({ darkMode, setDarkMode, showMenu }) => {
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
          <Item>
            <HomeIcon />
            Home
          </Item>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
          <Hr />
          <Item>
            <VideoLibraryOutlinedIcon />
            Library
          </Item>
          <Item>
            <HistoryOutlinedIcon />
            History
          </Item>
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
          <Hr />
          <Title>BEST OF UFOTUBE</Title>
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
          <Item>
            <SportsBasketballOutlinedIcon />
            Sports
          </Item>
          <Item>
            <SportsEsportsOutlinedIcon />
            Gaming
          </Item>
          <Item>
            <MovieOutlinedIcon />
            Movies
          </Item>
          <Item>
            <ArticleOutlinedIcon />
            News
          </Item>
          <Item>
            <LiveTvOutlinedIcon />
            Live
          </Item>
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
      </Wrapper>
    </Container>
  )
}

export default Menu
