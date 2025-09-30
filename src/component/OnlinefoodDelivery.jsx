import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import Restaurentscard from './Restaurentscard'

function OnlinefoodDelivery() {
    const [data,setdata] = useState([])
   


            async function fetchdata(){
                const data = await fetch("/api-d/restaurants/list/v5?lat=12.9147078&lng=77.61344")
                const result = await data.json()
                console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants )
                setdata(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
                
            }
        
            useEffect(() => {
                fetchdata()
            }, [])

   

  return (
        <div className='w-full mt-16 '>
                {/* < className='w-[72%] mx-auto  mt-4 overflow-hidden ' /down in the div this classname was added /> */}
                <div >
                     <div className='  text-xl font-bold mt-4 flex justify-between ' >
        
                        <h1>Restaurants with online food delivery in Bangalore</h1>

                    </div>
                    
                    
                     {/* <div className={' grid grid-cols-5 mt-4 gap-2  ' }> */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4 gap-6 place-items-start">

                        
                     {
                            data.map((restro, cta )=>(
                                
                              <Restaurentscard key={restro.info.id} restro = {restro} link={cta?.link}/>
                              
                            ))
                           
                        }
                                
                    </div> 
                    
                    
                    <hr className='border'/>
                 
                </div>
             
            </div>
       
  )
}

export default OnlinefoodDelivery

