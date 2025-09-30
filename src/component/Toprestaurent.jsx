import React, { use, useEffect } from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Restaurentscard from './Restaurentscard'

function Toprestaurent() {
    const [data,setdata] = useState([])
    const[value,setvalue] = useState(0)


            async function fetchdata(){
                const data = await fetch("/api-d/restaurants/list/v5?lat=12.9147078&lng=77.61344")
                const result = await data.json()
                console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants )
                setdata(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
                
            }
        
            useEffect(() => {
                fetchdata()
            }, [])

    
    function handleprev(){
     value >= 0 ?"" : setvalue ((prev)=> prev+280)
    }

    function handlenext(){
      value <= (-4760) ? "" :  setvalue ((prev)=> prev-280)
    }
    console.log(value)

  return (
        <div className='w-full mt-14 '>
                {/* < className='w-[72%] mx-auto  mt-4 overflow-hidden ' /down in the div this classname was added /> */}
                <div >
                     <div className='  text-xl font-bold mt-4 flex justify-between ' >
        
                        <h1>Top restaurant chains in Bangalore</h1>
                   
                         <div className="flex gap-4">
                        {/* Left Arrow */}
                        <div
                            onClick={handleprev}
                            className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer 
                            ${value <= 0 ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-slate-200 text-gray-800"}`}
                        >
                            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                        </div>
        
                        {/* Right Arrow */}
                        <div
                            onClick={handlenext}
                            className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer
                            ${value >= 150 ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-slate-200 text-gray-800"}`}
                        >
                            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                        </div>
                        </div>
        
                    </div>
                    
                    
                    <div className={'flex mt-4 gap-2 transform transition-transform duration-500 ease-out ' }style={{ transform:`translateX(${value}px)` }}>
                        
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

export default Toprestaurent
