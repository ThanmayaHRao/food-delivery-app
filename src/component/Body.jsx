import React, { useContext, useState } from 'react'
import Onyourhead from './Onyourhead'  
import Toprestaurent from './Toprestaurent' 
import OnlinefoodDelivery from './OnlinefoodDelivery'
import {Coordinates } from '../context/contextAPI'


function Body() {
    const {coordinates:{lat,lng}} = useContext(Coordinates)
  

return (
    <div className='w-full '>
       
        <div className=' w-[77%] mx-auto  mt-4 overflow-hidden '>
            <Onyourhead/>
            <Toprestaurent/>
            <OnlinefoodDelivery/>
        </div>
     
    </div>
  )
}

export default Body
