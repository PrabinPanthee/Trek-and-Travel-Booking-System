import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../Pages/Home'
import Tour from '../Pages/Tour'
import TourDetails from '../Pages/TourDetails'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import SearchResult from '../Pages/SearchResultList'
import About from '../Pages/about'

import AdminLayout from '../components/Layout/AdminLayout'
import AdminBookingList from '../Pages/AdminBookingList'
import AdminToursList from '../Pages/AdminToursList'
import AdminUsersList from '../Pages/AdminUsersList'
import AdminCreateTour from '../Pages/AdminCreateTour'
import AdminUpdateTour from '../Pages/AdminUpdateTour'
import KhaltiSuccess from '../Pages/KhaltiSuccess'


function Routers() {
  return (
     <Routes>
        <Route path='/' element = {<Navigate to ="/home"/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path='/tours' element = {<Tour/>}/>
        <Route path='/tours/:id' element = {<TourDetails/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/tours/search' element = {<SearchResult/>}/>
        <Route path='/about' element = {<About/>}/>

        
        <Route path='/tours/:id' element = {<TourDetails/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/admin' element={<AdminLayout/>}>
        <Route path='Admin-users-list' element={<AdminUsersList/>}/>
        <Route path='Admin-tours-list'element={<AdminToursList/>}/>
        <Route path='Admin-booking-list'element={<AdminBookingList/>}/>
        </Route>
        <Route path='/admin/Admin-tours-list/create-tour' element={<AdminCreateTour/>}/>
        <Route path='/admin/Admin-tours-list/:id' element={<AdminUpdateTour/>}/>
        <Route path='/success' element={<KhaltiSuccess/>} />
        
        
     </Routes>
  )
  }

export default Routers