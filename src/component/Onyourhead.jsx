import React from 'react'   
import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { Coordinates } from '../context/contextAPI'

function Onyourhead() {
        const [data,setdata] = useState([])
        const [value,setvalue] = useState(0)
        const {coordinates:{lat,lng}} = useContext(Coordinates)
        const [serviceable,setserviceable] = useState({})
    
        // async function fetchdata(){
        //     const data = await fetch(`/api-d/restaurants/list/v5?lat=${lat}&lng=${lng}`)
        //     const result = await data.json()
        //     console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info )
        //     setdata(result?.data?.cards[0]?.card?.card?.imageGridCards?.info || []) 
            
        // }
        async function fetchdata() {
            try {
                const res = await fetch(`/api-d/restaurants/list/v5?lat=${lat}&lng=${lng}`);
                const result = await res.json();

                // ✅ Use .find to safely extract the desired object
                setserviceable(result?.data)
                const imageGridInfo =
                result?.data?.cards?.find(
                    (card) => card?.card?.card?.imageGridCards?.info
                )?.card?.card?.imageGridCards?.info || [];

                console.log(imageGridInfo);
                setdata(imageGridInfo);
            } catch (error) {
                console.error('Error fetching image grid data:', error);
            }
            }

    
        useEffect(() => {
            fetchdata()
        }, [lat, lng])

        if(data.communication){
            return <div>oops location unserviceable...!</div>
        }
    
        console.log(value)
    
        function handleprev(){
         value >= 150? "" :   setvalue ((prev)=> prev+30)
        }
        function handlenext(){
          setvalue ((prev)=> prev-30) 
        }
  return (

      <div className='w-full '>
            <div >
                 <div className='  text-xl font-bold mt-4 flex justify-between ' >
    
                    <h1>What's on your mind?</h1>
                    {/* <div className='flex  gap-4'>
                        <div onClick={handlenext} className= {'bg-slate-200 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer'+ (value <= 0 ? "bg-grey-300" : "bg-grey-800") } >
                            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" transform={(value <= 0 ? "text-grey-300" : "text-grey-800")} />
                            </div>
                        <div on onClick={handleprev} className= {'bg-slate-200 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer'+ (value >= 150 ? "bg-grey-300" : "bg-grey-800") }>
                            <FontAwesomeIcon icon= {faArrowRight} className="text-sm" transform={(value >= 150 ? "text-grey-300" : "text-grey-800")} />
                            </div>
                    </div> */}
                     <div className="flex gap-4">
                    {/* Left Arrow */}
                    <div
                        onClick={handlenext}
                        className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer 
                        ${value <= 0 ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-slate-200 text-gray-800"}`}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                    </div>
    
                    {/* Right Arrow */}
                    <div
                        onClick={handleprev}
                        className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer
                        ${value >= 150 ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-slate-200 text-gray-800"}`}
                    >
                        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                    </div>
                    </div>
    
                </div>
                
                
                <div
                 style={{translate:`-${value}%`}} 
                 className='flex  duration-500'>
                       {
                data.map((item) => (

                    <img 
                        key={item.id}
                        className=' w-44  mr-4 hover:scale-95 transition-transform duration-150 ease-in-out rounded-lg cursor-pointer hover:shadow-lg '      
                        src={	`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId} `} />
                    ))
            }
                </div>
                <hr className='border'/>
             
            </div>
         
        </div>
   
  )
}

export default Onyourhead
