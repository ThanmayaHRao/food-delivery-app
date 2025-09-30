import React from 'react'
import Onyourhead from './Onyourhead'  
import Toprestaurent from './Toprestaurent' 
import OnlinefoodDelivery from './OnlinefoodDelivery'


function Body() {
  

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
