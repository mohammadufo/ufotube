import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'
import { phone } from '../../utils/responsive'
import {
  InputBase,
  styled as muiStyled,
  alpha,
  Button,
  IconButton,
} from '@mui/material'

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  margin-top: 5px;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
`

const SearchBox = styled.div`
  width: 40%;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`

const Search = muiStyled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = muiStyled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = muiStyled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '25ch',
      },
    },
  },
}))

const Hambergure = styled.div`
  display: none;

  ${phone({ display: 'block' })}
`

const Navbar = ({ showMenu, setShowMenu }) => {
  return (
    <Container>
      <Wrapper>
        <Hambergure onClick={() => setShowMenu(true)}>
          <IconButton aria-label="delete" disabled color="primary">
            <MenuIcon sx={{ fontSize: '30px', color: '#fff' }} />
          </IconButton>
        </Hambergure>
        <SearchBox onClick={() => setShowMenu(false)}>
          <Search>
            <SearchIconWrapper>
              <SearchOutlinedIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </SearchBox>
        <Link
          to="signin"
          style={{ textDecoration: 'none' }}
          onClick={() => setShowMenu(false)}
        >
          <Button variant="outlined" startIcon={<AccountCircleOutlinedIcon />}>
            SIGN IN
          </Button>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default Navbar
