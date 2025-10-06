import { Link , Outlet } from 'react-router-dom';
import { faCartShopping, faBagShopping, faPercent, faCircleInfo, faUser, faMagnifyingGlass ,faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Visiblity } from '../context/contextAPI';
import { Coordinates } from '../context/contextAPI';


function Head() {

  const {visible,setvisible} = useContext(Visiblity)

  const[searchresult,setsearchresult] = useState([])
  const {setcoordinates} = useContext(Coordinates)
  const [address,setaddress] = useState("")

 
 function handlevisiblity(){
     setvisible(prev => !prev)
 } 

 async function searchResultfunctionality(value){
  if (value == "")return
      const res = await fetch(`/api-d/misc/place-autocomplete?input=${value}`)
      const data = await res.json()
      console.log(data.data)
      setsearchresult(data.data)
 }
  async function fetchLatandLng(id){
     if (id == "")return
       const res = await fetch(`/api-d/misc/address-recommend?place_id=${id}`)
       const data = await res.json()
      
      setcoordinates({
        lat : data.data[0].geometry.location.lat,
        lng : data.data[0].geometry.location.lng
      })
      
      console.log(data.data[0].geometry.location.lat)
      console.log(data.data[0].geometry.location.lng)
      console.log(data.data)
      setaddress(data.data[0].address_components[0].long_name)
  
 }
 

  return (
    <div className='relative w-full'>

      
      <div className='w-full'>
            <div onClick={handlevisiblity} className={' w-full h-full bg-black/50 z-30   absolute ' + (visible ? "visible": "invisible")}></div>
            <div className={'bg-white w-1/3 h-full p-5 z-40 absolute transition-all duration-500 ease-in-out '+(visible ? "left-0" : "-left-[100%]")}>
            <p className='bg-black text-white p-5 w-[10%]' onClick={handlevisiblity}>click</p>
          <input
                type="text"
                className="border p-5 focus:outline-none focus:shadow-lg"
                onChange={(e)=>searchResultfunctionality(e.target.value)}
              />

              <div>
                <ul>
                  {
                    searchresult.map((data, idx) => (
                      <li key={idx} onClick={()=> fetchLatandLng(data.place_id)} className='border-b p-5 cursor-pointer hover:bg-gray-200'>
                        
                        <p>{data.structured_formatting.main_text}</p>
                        <p className='text-sm opacity-30'>{data.structured_formatting.secondary_text}</p>
                        </li>
                    ))}
                </ul>
              </div>


            </div>
      </div>
       
      
     

      <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="w-full shadow-md h-20 z-20 flex justify-center items-center bg-white">
        <div className="w-[74%] flex items-center">
          {/* Logo or location section */}
          <div className="flex items-center cursor-pointer " >
            <Link to = {"/"}>
            <img className='w-24' src="https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Emblem.png" alt="swiggy logo" />
            </Link>
           <div className='flex items-center cursor-pointer gap-2'>
             <p ><span className="font-bold border-b-2 border-black"onClick={handlevisiblity}>Others</span> 
              <span className=' text-sm ml-3 opacity-55 '>{address}</span>
            <span onClick={handlevisiblity}><FontAwesomeIcon icon={faChevronDown} className='text-orange-500' /></span> </p></div>
          </div>

          {/* Right side menu */}
          <div className="flex items-center gap-10 ml-auto cursor-pointer">
            <div><FontAwesomeIcon icon={faBagShopping} /> Swiggy Corporate</div>
            <div><FontAwesomeIcon icon={faMagnifyingGlass} /> Search</div>
            <div><FontAwesomeIcon icon={faPercent} /> Offers</div>
            <div><FontAwesomeIcon icon={faCircleInfo} /> Help</div>
            <div><FontAwesomeIcon icon={faUser} /> Sign In</div>
            <div><FontAwesomeIcon icon={faCartShopping} /> Cart</div>
          </div>
        </div>
      </div>

      {/* Body will render here */}
      <main className="flex-grow ">
        <Outlet />
      </main>
    </div>
    </div>
    
  );
}

export default Head;
