import * as Yup from 'yup'

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  email: Yup.string().email('email is not valid').required('email is required'),
  password: Yup.string().required('password is required'),
})

export const signInSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  password: Yup.string().required('password is required'),
})
