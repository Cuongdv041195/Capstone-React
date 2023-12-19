import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import React, { Fragment, useEffect } from 'react'
import { getMovieBookingApi } from '../../apis/booking'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classes from './styles.module.css'

const Booking = () => {
  const movieShowtimes = useSelector((state) => state.movieShowtimesReducer)
  console.log('movieShowtimes: ', movieShowtimes)

  const dispatch = useDispatch()

  const { showTimesID } = useParams()

  const { data = [], isLoading } = useQuery({
    queryKey: ['booking', showTimesID],
    queryFn: () => getMovieBookingApi(showTimesID),
    enabled: !!showTimesID,
  })
  console.log('data: ', data)
  console.log('Thông tin: ', data?.thongTinPhim?.tenCumRap)
  // console.log('movieShowtimes.data: ', movieShowtimes.data)

  useEffect(() => {
    getMovieBookingApi(showTimesID)
  }, [showTimesID])

  const renderMovieChair = (data) => {
    return data.danhSachGhe?.map((chair, index) => {
      let indexChair = movieShowtimes.bookingChairList.findIndex(
        (choseChair) => choseChair.maGhe === chair.maGhe
      )
      let classBookedChair = chair.daDat ? classes.bookedChair : null
      let classVipChair = chair.loaiGhe === 'Vip' ? classes.vipChair : null
      let classChoosingChair = ''
      if (indexChair !== -1) {
        classChoosingChair = 'green '
        // console.log(classChoosingChair, "aa");
      }
      return (
        <Fragment key={chair.maGhe}>
          <Button
            disabled={chair.daDat}
            className={`${classes.chair} ${classBookedChair} ${classVipChair}`}
            style={{ backgroundColor: `${classChoosingChair} !important` }}
            onClick={() => {
              dispatch({
                type: 'CHOOSE_CHAIR',
                payload: chair,
              })
            }}
          >
            {chair.daDat ? 'X' : chair.stt}
          </Button>
          {/* {(index + 1) % 16 === 0 ? renderChairRow(num) : ""} */}
          {(index + 1) % 16 === 0 ? <br /> : ''}
        </Fragment>
      )
    })
  }
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={8}>
          <div className={classes.chairContainer}>
            <img
              style={{ width: '100%' }}
              src="https://tix.vn/app/assets/img/icons/screen.png"
            />
            <div style={{ width: '79.9%', margin: '0 auto' }}>
              {data ? renderMovieChair(data) : null}
            </div>
            <div className={classes.demoChairContainer}>
              <div className={classes.demoChairGroup}>
                <Button
                  disabled={true}
                  className={`${classes.chair} ${classes.bookedChair} ${classes.demoChair}`}
                >
                  X
                </Button>
                <Typography>Đã đặt</Typography>
              </div>
              <div className={classes.demoChairGroup}>
                <Button
                  disabled={true}
                  className={`${classes.chair} ${classes.demoChair}`}
                ></Button>
                <Typography>Thường</Typography>
              </div>
              <div className={classes.demoChairGroup}>
                <Button
                  disabled={true}
                  className={`${classes.chair} ${classes.vipChair} ${classes.demoChair}`}
                ></Button>

                <Typography>Vip</Typography>
              </div>
            </div>
          </div>
        </Grid>
        {movieShowtimes.data ? (
          <Grid item xs={4}>
            <div className={classes.datveBox}>
              <div className={classes.sectionSpacing}>
                <Typography
                  style={{
                    color: '#8bc34a',
                    fontSize: '35px',
                    textAlign: 'center',
                  }}
                >
                  {movieShowtimes.bookingChairList.reduce(
                    (tongTien, gheDD, index) => {
                      return (tongTien += gheDD.giaVe)
                    },
                    0
                  )}
                  VND
                </Typography>
              </div>
              <Divider variant="middle" />
              <Box className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Cụm Rạp:</Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {data?.thongTinPhim?.tenCumRap}
                </Typography>
              </Box>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Địa chỉ:</Typography>
                <Typography
                  variant="h3"
                  className={`${classes.spanInfo} ${classes.textElipsis}`}
                >
                  {movieShowtimes.data.thongTinPhim.diaChi}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Rạp:</Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {movieShowtimes.data.thongTinPhim.tenRap}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Ngày giờ chiếu:</Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {movieShowtimes.data.thongTinPhim.ngayChieu} -
                  <span style={{ color: 'red' }}>
                    {movieShowtimes.data.thongTinPhim.gioChieu}
                  </span>
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Tên Phim:</Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {movieShowtimes.data.thongTinPhim.tenPhim}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={`${classes.sectionSpacing} ${classes.flexInfo}`}>
                <Typography variant="h3">Chọn: </Typography>
                <Typography variant="h3" className={classes.spanInfo}>
                  {movieShowtimes.bookingChairList.map((bookChair, index) => {
                    return <span>Ghế {bookChair.stt}, </span>
                  })}
                </Typography>
              </div>
              <Divider variant="middle" />
              <Button
                onClick={() => {
                  if (!localStorage.getItem(CURRENTUSER)) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Bạn chưa đăng nhập',
                      text: 'Bạn có muốn đăng nhập không ?',
                      confirmButtonText: 'Đồng ý',
                      showDenyButton: true,
                      denyButtonText: 'Không',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        history.push('/sign-in')
                      }
                    })
                    return
                  }
                  if (movieShowtimes.bookingChairList.length === 0) {
                    Swal.fire({
                      icon: 'error',
                      title: 'Bạn chưa chọn ghế',
                      text: 'Vui lòng chọn ghế ?',
                      confirmButtonText: 'Đã hiểu',
                    })
                    return
                  }
                  let userLogin = JSON.parse(localStorage.getItem(CURRENTUSER))
                  let objectAPI = {
                    maLichChieu: props.match.params.maLichChieu,
                    danhSachVe: movieShowtimes.bookingChairList,
                    taiKhoanNguoiDung: userLogin.taiKhoan,
                  }
                  // console.log(objectAPI);
                  const action = actBookTicket(objectAPI)
                  dispatch(action)
                  Swal.fire({
                    icon: 'success',
                    title: 'Đặt vé thành công',
                    text: 'Kiểm tra trong lịch sử đặt vé',
                    confirmButtonText: 'Đồng ý',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(
                        actGetMovieShowtimesApi(props.match.params.maLichChieu)
                      )
                    } else {
                      dispatch(
                        actGetMovieShowtimesApi(props.match.params.maLichChieu)
                      )
                    }
                  })
                }}
                className={classes.buttonPurchase}
              >
                ĐẶT VÉ
              </Button>
            </div>
          </Grid>
        ) : null}
      </Grid>
    </div>
  )
}

export default Booking
