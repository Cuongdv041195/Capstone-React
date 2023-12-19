import { useState } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { PATH } from './routes/path'
import HomeModule from './modules/home'
import MovieLayout from './layouts/MovieLayout'
import NotFound from './modules/not-found'
import Details from './modules/details'
import Booking from './modules/booking'
function App() {
  const props = useParams()
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATH.HOME} element={<MovieLayout />}>
          <Route index element={<HomeModule />} />
          <Route path="movie/:movieId" element={<Details />} />
          <Route
            path="purchase/:showTimesID"
            element={<Booking props={props} />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
