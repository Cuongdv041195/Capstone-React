import fetcher from './fetcher'

export const getMovieBookingApi = async (showTimesID) => {
  try {
    const response = await fetcher.get('/QuanLyDatVe/LayDanhSachPhongVe', {
      params: {
        MaLichChieu: showTimesID,
      },
    })
    return response.data.content
  } catch (error) {
    throw 'Lỗi'
  }
}
