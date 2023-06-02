import * as React from 'react'
import Button from '@mui/material/Button'
import { styled as muiStyled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from 'styled-components'
import { TextField, Fab } from '@mui/material'
import { useState, useEffect } from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import app from '../utils/firebase'
import { publicService } from '../services/publicRequest'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const Container = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
const UploadBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`
const Span = styled.span``

const BootstrapDialog = muiStyled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}))

export interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

export default function AddVideoModal({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false)
  }

  const navigate = useNavigate()

  const [video, setVideo] = useState(null)
  const [img, setImg] = useState(null)
  const [imagePerc, setImagePerc] = useState(0)
  const [videoPerc, setVideoPerc] = useState(0)
  const [inputs, setInputs] = useState({})
  const [tags, setTags] = useState([])

  const handleTags = (e) => {
    setTags(e.target.value.split(','))
  }

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        urlType === 'imgUrl'
          ? setImagePerc(Math.round(progress))
          : setVideoPerc(Math.round(progress))
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
          default:
            break
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL }
          })
        })
      }
    )
  }

  useEffect(() => {
    video && uploadFile(video, 'videoUrl')
  }, [video])

  useEffect(() => {
    img && uploadFile(img, 'imgUrl')
  }, [img])

  const handleUpload = async (e) => {
    e.preventDefault()
    const res = await publicService.api(
      'POST',
      '/videos',
      {},
      { ...inputs, tags }
    )
    setOpen(false)
    res.status === 200 && navigate(`/video/${res.data._id}`)

    enqueueSnackbar('Well done! video added successfully 🥳🥰', {
      variant: 'success',
      anchorOrigin: {
        horizontal: 'top',
        vertical: 'center',
      },
    })
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Upload New Video
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Container>
            <UploadBox>
              <Fab
                variant="contained"
                component="label"
                color="primary"
                aria-label="add"
              >
                <CloudUploadIcon />
                <input
                  type="file"
                  accept="video/*"
                  hidden
                  onChange={(e) => setVideo(e.target.files[0])}
                />
              </Fab>
              {videoPerc > 0 ? (
                <Span>{'Uploading:' + videoPerc}</Span>
              ) : (
                <Span>Upload Video</Span>
              )}
            </UploadBox>
            <TextField
              name="title"
              label="Title"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              label="Description"
              name="desc"
              multiline
              rows={3}
              onChange={handleChange}
            />
            <TextField
              label="tags"
              placeholder="Separate the tags with commas."
              variant="outlined"
              onChange={handleTags}
            />
            <UploadBox>
              <Fab
                variant="contained"
                component="label"
                color="primary"
                aria-label="add"
              >
                <CloudUploadIcon />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </Fab>
              {imagePerc > 0 ? (
                <Span>{'Uploading:' + imagePerc}</Span>
              ) : (
                <Span>Upload Image</Span>
              )}
              {imagePerc}
            </UploadBox>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            autoFocus
            onClick={handleUpload}
          >
            Upload
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
