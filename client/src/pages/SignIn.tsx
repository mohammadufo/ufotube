import React, { useState } from 'react'
import styled from 'styled-components'
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  FormHelperText,
  CircularProgress,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useFormik } from 'formik'
import { signInSchema, signUpSchema } from '../validations/user'
import { publicService } from '../services/publicRequest'
import { enqueueSnackbar } from 'notistack'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from '../redux/userSlice'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`

const Title = styled.h1`
  font-size: 24px;
`

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`

const Links = styled.div`
  margin-left: 50px;
`

const Link = styled.span`
  margin-left: 30px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 0.7rem;
`

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showSignUpPassword, setShowSignUpPassword] = useState(false)

  const dispatch = useDispatch()

  const { registerLoading, loading } = useSelector((state) => state.user)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const handleClickSingUpShowPassword = () =>
    setShowSignUpPassword((show) => !show)

  const initialSignInValue = {
    name: '',
    password: '',
  }

  const initialSignUpValue = {
    name: '',
    email: '',
    password: '',
  }

  const signInformik = useFormik({
    initialValues: initialSignInValue,
    onSubmit: async (values) => {
      try {
        dispatch(loginStart())
        const response = await publicService.api(
          'POST',
          '/auth/signin',
          {},
          values
        )
        dispatch(loginSuccess(response.data))
        enqueueSnackbar(`Welcome back ${response.data.name} 👋🏻`, {
          variant: 'success',
          anchorOrigin: {
            horizontal: 'top',
            vertical: 'center',
          },
        })
        console.log(response.data)
      } catch (err) {
        console.log(err)
        dispatch(loginFailure())
        enqueueSnackbar(`oops! something went wrong 💀`, {
          variant: 'error',
          anchorOrigin: {
            horizontal: 'top',
            vertical: 'center',
          },
        })
      }
    },
    validationSchema: signInSchema,
  })
  const signUpformik = useFormik({
    initialValues: initialSignUpValue,
    onSubmit: async (values) => {
      try {
        dispatch(registerStart())
        const response = await publicService.api(
          'POST',
          '/auth/signup',
          {},
          values
        )
        dispatch(registerSuccess(response.data))
        enqueueSnackbar(`Welcome ${response.data.name} 💕`, {
          variant: 'success',
          anchorOrigin: {
            horizontal: 'top',
            vertical: 'center',
          },
        })
        console.log(response.data)
      } catch (err) {
        console.log(err)
        dispatch(registerFailure())
        enqueueSnackbar(`oops! something went wrong 💀`, {
          variant: 'error',
          anchorOrigin: {
            horizontal: 'top',
            vertical: 'center',
          },
        })
      }
    },
    validationSchema: signUpSchema,
  })

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to UFOTUBE</SubTitle>
        <Form autoComplete="off" onSubmit={signInformik.handleSubmit}>
          <TextField
            label="name"
            variant="outlined"
            size="small"
            name="name"
            fullWidth
            helperText={
              signInformik.touched.name ? signInformik.errors.name : null
            }
            error={Boolean(
              signInformik.touched.name && signInformik.errors.name
            )}
            value={signInformik.values?.name}
            onChange={signInformik.handleChange}
          />
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              password
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="password"
              error={Boolean(
                signInformik.touched.password && signInformik.errors.password
              )}
              value={signInformik.values?.password}
              onChange={signInformik.handleChange}
            />
            {signInformik.touched.password ? (
              <FormHelperText error>
                {signInformik.errors.password}
              </FormHelperText>
            ) : null}
          </FormControl>

          <Button type="submit" variant="outlined">
            {loading ? <CircularProgress size="1.5rem" /> : 'Sign In'}
          </Button>
        </Form>
        <Title>or</Title>
        <Form autoComplete="off" onSubmit={signUpformik.handleSubmit}>
          <TextField
            label="name"
            name="name"
            variant="outlined"
            size="small"
            fullWidth
            helperText={
              signUpformik.touched.name ? signUpformik.errors.name : null
            }
            error={Boolean(
              signUpformik.touched.name && signUpformik.errors.name
            )}
            value={signUpformik.values?.name}
            onChange={signUpformik.handleChange}
          />
          <TextField
            label="email"
            name="email"
            variant="outlined"
            size="small"
            fullWidth
            helperText={
              signUpformik.touched.email ? signUpformik.errors.email : null
            }
            error={Boolean(
              signUpformik.touched.email && signUpformik.errors.email
            )}
            value={signUpformik.values?.email}
            onChange={signUpformik.handleChange}
          />
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="outlined-adornment-password2"
              type={showSignUpPassword ? 'text' : 'password'}
              name="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickSingUpShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showSignUpPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="password"
              error={Boolean(
                signUpformik.touched.password && signUpformik.errors.password
              )}
              value={signUpformik.values?.password}
              onChange={signUpformik.handleChange}
            />
            {signUpformik.touched.password ? (
              <FormHelperText error>
                {signUpformik.errors.password}
              </FormHelperText>
            ) : null}
          </FormControl>
          <Button variant="outlined" type="submit">
            {registerLoading ? <CircularProgress size="1.5rem" /> : 'Sign Up'}
          </Button>
        </Form>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  )
}

export default SignIn
