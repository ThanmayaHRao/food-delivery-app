import { Link , Outlet } from 'react-router-dom';
import { faCartShopping, faBagShopping, faPercent, faCircleInfo, faUser, faMagnifyingGlass ,faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function Head() {

  const [visible,setvisible] = useState(true)

 
 function handlevisiblity(){
     setvisible(prev => !prev)
 } 


  return (
    <div className='relative w-full'>

      
      <div className='w-full'>
            <div onClick={handlevisiblity} className={' w-full h-full bg-black/50 z-30   absolute ' + (visible ? "visible": "invisible")}></div>
            <div className={'bg-white w-1/3 h-full z-40 absolute transition-all duration-500 ease-in-out '+(visible ? "left-0" : "-left-[100%]")}>
            <p className='bg-black text-white p-5 w-[10%]' onClick={handlevisiblity}>click</p>

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
             <p className="font-bold border-b-2 border-black"onClick={handlevisiblity}>Others 
             </p> <FontAwesomeIcon icon={faChevronDown} className='text-orange-500'/></div>
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
