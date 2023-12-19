import React from 'react'
import { Box } from '@mui/material'
import MovieProfile from './MovieProfile'
import ShowTimes from './Showtimes'
import { useParams } from 'react-router-dom'

const Details = () => {
  const { movieId } = useParams()
  return (
    <Box>
      <MovieProfile movieId={movieId} />
      <ShowTimes movieId={movieId} />
    </Box>
  )
}

export default Details
