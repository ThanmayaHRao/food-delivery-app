import { Link , Outlet } from 'react-router-dom';
import { faCartShopping, faBagShopping, faPercent, faCircleInfo, faUser, faMagnifyingGlass ,faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Head() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="w-full shadow-md h-20 flex justify-center items-center bg-white">
        <div className="w-[74%] flex items-center">
          {/* Logo or location section */}
          <div className="flex items-center cursor-pointer">
            <Link to = {"/"}>
            <img className='w-24' src="https://logos-world.net/wp-content/uploads/2020/11/Swiggy-Emblem.png" alt="swiggy logo" />
            </Link>
           <div className='flex items-center cursor-pointer gap-2'> <p className="font-bold border-b-2 border-black">Others  </p> <FontAwesomeIcon icon={faChevronDown} className='text-orange-500'/></div>
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
  );
}

export default Head;
