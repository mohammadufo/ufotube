import { useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import { darkTheme, lightTheme } from './utils/Theme'
import { Outlet } from 'react-router-dom'
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow-y: hidden;
  position: relative;
`

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`
const Wrapper = styled.div``

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [showMenu, setShowMenu] = useState(false)

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Menu
            showMenu={showMenu}
            setShowMenu={setShowMenu}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <Main>
            <Navbar showMenu={showMenu} setShowMenu={setShowMenu} />
            <Wrapper onClick={() => setShowMenu(false)}>
              <Outlet />
            </Wrapper>
          </Main>
        </Container>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}

export default App
