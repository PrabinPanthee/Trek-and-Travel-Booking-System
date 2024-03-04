import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Home from '../Pages/Home'
import Tour from '../Pages/Tour'
import TourDetails from '../Pages/TourDetails'
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import SearchResult from '../Pages/SearchResultList'

function Routers() {
  return (
     <Routes>
        <Route path='/' element = {<Navigate to ="/home"/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path='/tour' element = {<Tour/>}/>
<<<<<<< HEAD
        <Route path='/tour/:id' element = {<TourDetails/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/tour/search' element = {<SearchResult/>}/>
=======
        <Route path='/tours/:id' element = {<TourDetails/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/tours/search' element = {<SearchResult/>}/>
>>>>>>> 0f5525d82 (added tour details and Booking layout)
        
        
     </Routes>
  )
  }

export default Routers