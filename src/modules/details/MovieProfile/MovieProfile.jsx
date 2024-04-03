import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getMovieDetailsAPI } from '../../../apis/movieAPI'
import {
  Box,
  Button,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import ShowTimes from '../Showtimes/ShowTimes'
import Swal from 'sweetalert2'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import classes from './styles.module.css'

const MovieProfile = ({ movieId }) => {
  const { data = {}, isLoading } = useQuery({
    queryKey: ['movie-details', movieId],
    queryFn: () => getMovieDetailsAPI(movieId),
    enabled: !!movieId,
  })
  const navigate = useNavigate()

  const times = dayjs(data.ngayKhoiChieu).format('DD-MM-YYYY')
  return (
    <div
      style={{ backgroundColor: '#212121', borderBottom: 'solid #212121 2px' }}
    >
      <Container
        maxWidth="lg"
        style={{ padding: '40px 50px' }}
        className={classes.root}
      >
        <Typography
          style={{
            textAlign: 'center',
            fontSize: '25px',
            fontWeight: 'bold',
            marginBottom: '30px',
          }}
        >
          Thông Tin Phim
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box>{<img src={data.hinhAnh} width={280} height={400} />}</Box>
          </Grid>
          <Grid item xs={8}>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className={classes.tenphim}
              >
                {data.tenPhim}
              </Typography>
              <div className={classes.time}>
                <AccessTimeIcon /> <span>: 120 Phút</span>
                <CalendarMonthIcon style={{ marginLeft: '15px' }} />{' '}
                <span>: {times}</span>
              </div>
              <Typography className={classes.rating}>
                <ThumbUpIcon style={{ marginRight: '5px' }} /> Rating:{' '}
                {data.danhGia}/10
              </Typography>

              {/* <Typography variant="body2" color="text.secondary">
              {' '}
              Ngày Khởi Chiếu:
              {times}
            </Typography> */}
            </CardContent>
            <CardActions>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  Swal.fire({
                    icon: 'info',
                    title: 'Xin chọn cụm rạp và giờ chiếu',
                    confirmButtonText: 'Đồng ý',
                    confirmButtonColor: '#1976d2',
                  })
                }}
              >
                Mua Vé
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default MovieProfile
