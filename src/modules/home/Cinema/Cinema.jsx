import {} from '@mui/icons-material'
import {
  Box,
  MenuItem,
  TextField,
  Container,
  Grid,
  Stack,
  Button,
  CardActions,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getListCinema, getMovieShowTimesAPI } from '../../../apis/cinemaAPI'

const Cinema = ({ movieId }) => {
  // const { data = [], isLoading } = useQuery({
  //   queryKey: ['hometool', movieId],
  //   queryFn: getListCinema,
  // })
  // console.log('data123: ', data)
  // const [film, setFilm] = useState('')
  // const [cinema, setCinema] = useState('')
  // const [date, setDate] = useState('')
  // const cinemaSystems = data.heThongRapChieu || []
  // console.log('cinemaSystems: ', cinemaSystems)
  // const renderFilm = (arr) => {
  //   return arr.map((item) => {
  //     return (
  //       <option key={item.maPhim} value={item.maPhim}>
  //         {item.tenPhim}
  //       </option>
  //     )
  //   })
  // }
  return (
    <Container maxWidth="lg" sx={{ marginTop: '70px' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            id="outlined-select-currency"
            fullWidth
            select
            label="Phim"
          >
            <MenuItem name="film" value={'Đất Rừng Phương Nam'}>
              Đất Rừng Phương Nam
            </MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField id="outlined-select-currency" fullWidth select label="Rạp">
            <MenuItem value={'BHD'}>BHD</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="outlined-select-currency"
            fullWidth
            select
            label="Ngày Giờ Chiếu"
          >
            <MenuItem value={'22/2/2022'}>22/2/2022</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={3}>
          <CardActions style={{ padding: '0' }}>
            <Button
              size="large"
              variant="contained"
              fullWidth
              style={{ height: '54px' }}
            >
              Mua Vé Ngay
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Cinema
