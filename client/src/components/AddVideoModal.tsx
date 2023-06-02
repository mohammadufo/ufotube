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

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`

const Container = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
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
                <input type="file" accept="video/*" hidden />
              </Fab>
              <Span>Upload Video</Span>
            </UploadBox>
            <TextField label="Title" variant="outlined" />
            <TextField label="Description" multiline rows={3} />
            <TextField
              label="tags"
              placeholder="Separate the tags with commas."
              variant="outlined"
            />
            <UploadBox>
              <Fab
                variant="contained"
                component="label"
                color="primary"
                aria-label="add"
              >
                <CloudUploadIcon />
                <input type="file" accept="image/*" hidden />
              </Fab>
              <Span>Upload Image</Span>
            </UploadBox>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained" autoFocus onClick={handleClose}>
            Upload
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
