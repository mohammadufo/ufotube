import styled from 'styled-components'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Link } from 'react-router-dom'
import { InputBase, styled as muiStyled, alpha, Button } from '@mui/material'

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
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`

const SearchBox = styled.div`
  width: 40%;
  position: absolute;
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

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <SearchBox>
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
        <Link to="signin" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" startIcon={<AccountCircleOutlinedIcon />}>
            SIGN IN
          </Button>
        </Link>
      </Wrapper>
    </Container>
  )
}

export default Navbar
