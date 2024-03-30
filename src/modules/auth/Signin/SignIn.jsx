import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { signinAPI } from '../../../apis/userAPI'
import { LoadingButton } from '@mui/lab'
import { Navigate, json, useNavigate } from 'react-router-dom'
import { PATH } from '../../../routes/path'
import { CURRENT_USER } from '../../../constants'
import { useAuth } from '../../../contexts/UserContext/UserContext'
import Swal from 'sweetalert2'

const SignIn = () => {
  const { currentUser, handleSignin: handleSigninContext } = useAuth()
  const navigate = useNavigate()
  const { handleSubmit, register } = useForm({
    defaultValues: {
      taiKhoan: '',
      matKhau: '',
    },
  })

  const { mutate: handleSignin, isPending } = useMutation({
    mutationFn: (values) => signinAPI(values), //{ taiKhoan : "" , matKhau:""}
    onSuccess: (values) => {
      //values là thông tin user
      handleSigninContext(values)
      if (values.maLoaiNguoiDung === 'KhachHang') navigate(PATH.HOME)
      if (values.maLoaiNguoiDung === 'QuanTri') navigate(PATH.ADMIN)
    },
    onError: (error) => {
      console.log('error', error)
      Swal.fire({
        icon: 'error',
        title: 'Sai Tên Đăng Nhập Hoặc Mật Khẩu',
        confirmButtonText: 'Đồng ý',
        confirmButtonColor: '#1976d2',
      })
      // alert('Sai Tên Đăng Nhập Hoặc Mật Khẩu')
    },
  })

  const onSubmit = (formValues) => {
    handleSignin(formValues) // { taiKhoan : "" , matKhau:""}
  }

  if (currentUser) {
    return <Navigate to={PATH.HOME} />
  }

  return (
    <Container maxWidth="md">
      <Grid
        container
        justifyContent={'center'}
        alignItems={'center'}
        padding={'50px 0'}
        textAlign={'center'}
      >
        <Grid item md={6}>
          <Typography
            component="h2"
            style={{ margin: '20px 0', fontWeight: 'bold', fontSize: '20px' }}
          >
            Đăng Nhập Tài Khoản
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              style={{ marginBottom: '15px' }}
              label="Tài khoản"
              fullWidth
              {...register('taiKhoan')}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              fullWidth
              {...register('matKhau')}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isPending}
              fullWidth
              style={{ margin: '15px 0' }}
            >
              Đăng nhập
            </LoadingButton>
          </form>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SignIn
