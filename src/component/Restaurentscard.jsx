import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Restaurentscard({ restro }) {
  if (!restro?.info) {
    // if info is missing, skip rendering this card
    return null
  }
  //  console.log(restro?.cta?.link.split("/")[5])
  return (
    
    <Link to ={`/restaurantMenu/${restro?.cta?.link.split("/").at(-1)}`} >
    <div className='mr-4 hover:scale-95 gap-2 transition-transform duration-150 ease-in-out rounded-lg cursor-pointer hover:shadow-lg'>
      <div className='w-72 h-48 p-2'>
        <div className='relative w-full h-full'>
          <img
            className='rounded-xl w-full h-full object-cover'
            src={
              restro?.info?.cloudinaryImageId
                ? "https://media-assets.swiggy.com/swiggy/image/upload/" + restro.info.cloudinaryImageId
                : "https://via.placeholder.com/300x200?text=No+Image"
            }
            alt={restro?.info?.name || "Restaurant"}
          />
          <div className='bg-gradient-to-t from-black/60 to-transparent w-full h-full absolute top-0 rounded-xl'></div>

          {restro?.info?.aggregatedDiscountInfoV3 && (
            <p className='absolute bottom-1 text-white px-3 font-bold text-xl'>
              {restro.info.aggregatedDiscountInfoV3.header +
                ' ' +
                restro.info.aggregatedDiscountInfoV3.subHeader}
            </p>
          )}
        </div>
      </div>

      <div className='px-2'>
        <h1 className='font-semibold mt-2'>{restro?.info?.name || "Unnamed"}</h1>
        <p className='text-sm text-black mt-1'>
          <FontAwesomeIcon icon={faStar} className='text-green-500' />{" "}
          {restro?.info?.avgRatingString || "N/A"} · {restro?.info?.sla?.slaString || "No ETA"}
        </p>
        <p className='text-sm text-gray-500 line-clamp-1'>
          {restro?.info?.cuisines?.join(", ") || "Cuisine not available"}
        </p>
        <p className='text-sm text-gray-600'>{restro?.info?.locality || "Location not available"}</p>
      </div>
    </div>

    </Link>
  )
  
}

export default Restaurentscard
