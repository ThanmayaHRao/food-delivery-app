import React, { useContext, useEffect,useState } from "react";
import { data, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Coordinates } from "../context/contextAPI";


   function ExpandableText({ text, maxChars = 120 }) {
        const [expanded, setExpanded] = React.useState(false);

        if (!text) return null;

        // if text is short, just show it
        if (text.length <= maxChars) {
          return <p className="text-gray-500 text-sm">{text}</p>;
        }

        return (
          <p className="text-gray-500 text-sm">
            {expanded ? text : text.slice(0, maxChars) + '… '}
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-gray-600 font-medium ml-1"
            >
              {expanded ? 'less' : 'more'}
            </button>
          </p>
        );
      }
        function RestaurantFooter() {
     return (
        <div className=" mt-8 border-t pt-4 text-gray-700">
          {/* FSSAI license */}
          <div className="flex items-center gap-2 text-sm">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/FSSAI_logo.svg/1200px-FSSAI_logo.svg.png"
              alt="FSSAI Logo"
              className="w-12 h-6 object-contain"
            />
            <span>License No. 11222334000979</span>
          </div>

          {/* Outlet info */}
          <div className="mt-4 text-sm">
            <p className="font-semibold">Burger King</p>
            <p className="text-gray-600">Outlet: Btm Layout</p>
            <p className="text-gray-500">
              Burger King India Pvt Ltd, Unit No QSR 1, 3rd Floor, Vega City Mall,
              Srinivas Industrial Estate Bannerghatta Road Bangalore 560076
            </p>
          </div>

      {/* App download section */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 mb-2">
          For better experience, download the Swiggy app now
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://play.google.com/store/apps/details?id=in.swiggy.android"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="h-10"
            />
          </a>
          <a
            href="https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/67/Download_on_the_App_Store_Badge.svg"
              alt="App Store"
              className="h-10"
            />
          </a>
        </div>
      </div>
    </div>
  );
}



function RestaurantMenu() {
  const { id } = useParams(); //  must CALL useParams()
  //  console.log(id.split("-"))
  let mainid = id.split("-").at(-1)
  //  console.log(mainid);
  // from mainid remove "rest"
 let restid = mainid.replace(/^rest/, "");
  //  console.log(restid)
 
  

  const [menudata, setmenudata] = useState([]);
  const [restrodata, setrestrodata] = useState("");
  const [discountdata, setdiscountdata] = useState([]);
  const [value, setvalue] = useState(0);
  const [toppicsvalue, settoppicsvalue] = useState(0);
  console.log(toppicsvalue)
  const [currindex , setcurrindex] = useState(0);
  const [toppics , settoppics] = useState({});
  const {coordinates:{lat,lng}} = useContext(Coordinates)

  // console.log(restrodata);
     
        function tooglefun(i){
          setcurrindex(i === currindex ? null : i)
        }
        
        function handleprev(){
         value >= 95? "" :   setvalue ((prev)=> prev+30)
        }
        function handlenext(){
          setvalue ((prev)=> prev-30) 
        }
        //  function handleprevfortoppicks(){
        //  toppicsvalue >= 95? "" :   settoppicsvalue ((back)=> back+30)
        // }
        // function handlenextfortoppicks(){
          
        //   settoppicsvalue ((back)=> back-30) 
        function handleprevfortoppicks() {
          const cardWidth = 43;
          const toppicksLength = toppics?.card?.card?.carousel?.length || 0;
          const maxScroll = (toppicksLength - 1) * cardWidth;
          if (toppicsvalue < maxScroll) {
            settoppicsvalue(v => v + cardWidth);
          }
        }
        function handlenextfortoppicks() {
          if (toppicsvalue > 0) {
            settoppicsvalue(v => v - 43);
          }
        }

        // }
  

  async function fetchapi() {
    
      
      let data = await fetch( `/api-m/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restid}&submitAction=ENTER`);
       
      let res = await data.json(); 
      setrestrodata(res?.data?.cards[2]?.card?.card?.info);
      // console.log(res?.data?.cards[2]?.card?.card?.info);
      setdiscountdata(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
      // console.log(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
      let actualmenu = (res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data => data?.card?.card?.itemCards || data?.card?.card?.categories)
      settoppics((res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(data =>data?.card?.card?.title =="Top Picks")[0])
      console.log(toppics)
      
     
      setmenudata(actualmenu)
      // console.log(res?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card);
       
      
  }
     


  useEffect(() => {
    fetchapi();
  },[]);

  return (
    <div className="w-full">
          <div className="w-[800px] mx-auto pt-4">
            <p className="text-sm text-slate-500"><Link to={"/"} ><span className=" hover:text-slate-700 hover:cursor-pointer">Home</span> </Link> / <Link to={"/"}><span className="hover:text-slate-700  hover:cursor-pointer">{restrodata.city}</span></Link>  / <span className="text-slate-500">{restrodata.name}</span></p>
            <h1 className="font-bold text-xl pt-8 ">{restrodata.name}</h1>
            <div className=" w-full h-[206px] bg-gradient-to-t from-slate-200/70  mt-6 rounded-[30px] px-4 pb-4">
              <div className="  h-full   rounded-[30px] border border-slate-200/70 bg-white">
              <div className="p-4 w-full">
              <div className="flex  items-center gap-1 font-semibold text-sm">
                 <span className='text-sm text-black '>
                            <FontAwesomeIcon icon={faStar} className='text-green-500' />{" "} </span>
                            <span>{restrodata.avgRating } </span>
                            <span>({restrodata?.totalRatingsString}) </span> . <span>{restrodata?.costForTwoMessage} </span>
                            
              </div>
              <div className="ml-1">
                  <p className="text-orange-500 font-semibold text-sm underline">{restrodata?.cuisines?.join (", ")}</p>
               </div>
                <div className="flex gap-2 ">
                    <div className="w-[7px] flex flex-col justify-center items-center  mt-3 ml-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <div className="w-[2px] h-8 bg-slate-400  "></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                    </div>
                  <div className="flex flex-col gap-4 pt-3">
                    <p className="font-semibold text-sm">Outlet <span className="text-slate-500 font-semibold text-sm">{restrodata.locality}</span></p>
                    
                    <p className="font-semibold text-sm">{restrodata?.sla?.slaString}</p>


                  </div>
                </div>
                </div>
                <hr />
                <div className="w-full  flex  gap-2 ">
                 <img className="w-7 h-7 object-cover rounded-sm ml-4 pt-2 " src="https://thumbs.dreamstime.com/b/bicycle-courier-icon-delivery-service-bike-symbol-delivering-package-fast-shipping-express-sign-food-391852585.jpg" alt="delivery bicycle image" />
                  <span className="text-slate-600 mt-2.5 text-[13px] font-light">{restrodata?.sla?.lastMileTravelString}, {restrodata?.sla?.serviceability}, Delivery charges may apply</span>
                </div>
              </div>   
            </div>
            <div className="w-full overflow-hidden">
               <div className='  text-xl font-bold mt-10 flex justify-between ' >
              
                              <h1>Deals for you</h1>
                             
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
                           className="flex gap-4 mt-4  duration-500 ">
                            {
                              
                              discountdata.map((data,idx)=>(
                                  <Discount key = {idx} data={data}/>
                              ))
                              
                            }
                          </div>
                          <div>
                            <h2 className="text-center mt-8 text-gray-500 text-sm">⇥ M E N U ⇤</h2>
                          </div>
                          <div  className="w-full mt-4">
                              <div className="flex items-center w-full p-3 rounded-xl bg-gray-200 text-gray-600">
                                  <span className="text-center flex-1">Search for dishes</span>
                                  <FontAwesomeIcon icon={faMagnifyingGlass} className="ml-auto" />
                              </div>

                          </div>
                           <div className='  text-xl font-bold mt-10 flex justify-between ' >
              
                              <h1 className="font-bold text-xl ">{toppics?.card?.card?.title}</h1>
                             
                               <div className="flex gap-4">
                              {/* Left Arrow */}
                              <div
                                  onClick={handlenextfortoppicks}
                                  className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer 
                                  ${toppicsvalue <= 0 ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-slate-200 text-gray-800"}`}
                              >
                                  <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
                              </div>
              
                              {/* Right Arrow */}
                              <div
                                  onClick={handleprevfortoppicks}
                    
                                  className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer
                                  ${toppicsvalue >= 150 ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-slate-200 text-gray-800"}`}
                              >
                                  <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                              </div>
                              </div>
              
                          </div>
                          <div
                                     style={{translate:`-${toppicsvalue}%`}}
                                      className="flex gap-4 mt-4  duration-500 ">
                            {
                              toppics && 
                              toppics?.card?.card?.carousel.map(({creativeId,dish:{info:{defaultPrice , price}}},mdx)=>(
                                <div className="relative w-[384px] h-[395px] overflow-hidden rounded-xl flex-shrink-0  " key={mdx}>
                                  <img className=" w-full h-full " src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" + creativeId}  />
                                   <div className=" absolute bottom-2 text-white flex p-3 w-full justify-center items-center">
                                  <p className="ml-2 font-light">₹{defaultPrice/100 || price/100}</p>
                                  <button className=" bg-white border text-green-600 font-semibold px-9 py-2 rounded-lg shadow ml-auto">Add</button>
                                  </div>
                                </div>
                                  
                              ))
                              
                            }
                          </div>



                          <div className="w-full ">
                                {
                                  menudata.map((data,i)=>(
                                       <Menuitems key={i} index={i} data={data}  currindex={currindex} tooglefun={tooglefun}/>
                                       
                                  ))
                                }
                          </div>
                          <div >
                            <RestaurantFooter/>
                          </div>
                         
            </div>
            
          </div>
          
    </div>
  )
     

}
function Discount({data : {info:{header , offerlogo,couponCode}}}){
  // console.log(info)
  return(
    <div className="flex  border border-slate-200 min-w-[320px] h-[74px] p-2 gap-3 rounded-2xl">
      <img   src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/offers/deal-of-day" } alt="" />
      <div  className="flex flex-col justify-center">
        <p className="font-semibold ">{header}</p>
        <p className="text-sm font-semibold text-slate-400">{couponCode}</p>
      </div>
            
    </div>
  )
}



// function Menuitems({data : {card : {itemCards,title}}}){
//   return(
//          <div>
//                      <div className="flex justify-between items-center border-b pb-2 mt-8">
//                             <span>{title} ({itemCards.length})</span> 
//                                 {<FontAwesomeIcon icon={faAngleUp} className="ml-auto" onClick={()=>tooglefun(i)}/>}
//                      </div>
//                                {
//                                   currindex === i &&
//                                     <div className="m-4">
//                                        {
                                            
//                                             itemCards.map(({card : {info}},idx)=>(
//                                               <div key={idx} >
//                                                 <h2>{info?.name}</h2>
//                                               </div>
                                            
//                                             ))
//                                           }
//                                   </div>
//                                }
                                          
//            </div>
//   )
// }
function Menuitems({ data, index, currindex, tooglefun }) {
  const title = data?.card?.card?.title || "No title";
  const itemCards = data?.card?.card?.itemCards;     // might be undefined
  const categories = data?.card?.card?.categories;   // might be undefined
  const isOpen = currindex === index;

  return (
    <div  >
      <div className="flex justify-between items-center border-t-[18px] pb-2 mt-8 font-bold">
        <span>
          {title}
          {itemCards ? ` (${itemCards.length})` : categories ? ` (${categories.length})` : ""}
        </span>
        <FontAwesomeIcon
          icon={faAngleDown}
          className={`ml-auto cursor-pointer transition-transform duration-100 transform ${isOpen ? 'rotate-180' : ''}`}
          onClick={() => tooglefun(index)}
        />
      </div>

      {isOpen && (
        <div className="m-4  ">
          {/* Case 1: simple itemCards */}
          
          {
          itemCards && itemCards.length > 0 && 
          (
            itemCards.map(({ card: { info } }) => (
              info?.imageId &&
              <div key={info?.id || info?.name} className="py-9 border-b flex ">
                
               
                <div className="flex flex-col gap-1 ">
                  <span
                    className={`w-3 h-3 border rounded-sm flex items-center justify-center 
                                ${info?.itemAttribute?.vegClassifier === 'VEG' 
                                    ? 'border-green-600' 
                                    : 'border-red-600'}`}>
                        <span
                          className={`w-1.5 h-1.5 rounded-full 
                                      ${info?.itemAttribute?.vegClassifier === 'VEG' 
                                          ? 'bg-green-600' 
                                          : 'bg-red-600'}`}
                        ></span>
                  </span>
                 <p className="font-semibold text-[18px]">{info?.name}</p>
                 {(info?.defaultPrice || info?.price) && (
                      <p className="font-semibold text-[15px]">
                        ₹{(info?.defaultPrice || info?.price) / 100}
                      </p>
                    )}

                 <p className="text-[13px]"> <FontAwesomeIcon icon={faStar} className='text-green-500' /> {info?.ratings?.aggregatedRating?.rating} ({info?.ratings?.aggregatedRating?.ratingCountV2})</p>
                  <div className="  text-gray-500 text-sm  w-[570px] ">
                    {
                      <ExpandableText text={info?.description} maxChars={120} />

                    }             
                </div>
                </div>
                <div className="relative w-40 ml-auto">
                  <button className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border text-green-600 font-semibold px-9 py-2 rounded-lg shadow">ADD </button>
                  
                  <img  className="w-40 h-28 rounded-lg object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/" + info?.imageId } />
                  

                </div>
                
                  
              </div>
            ))
          )
          }

          {/* Case 2: nested categories */}
          {
          categories && categories.length > 0 && 
          (
            categories.map((cat) => (
              <div key={cat.categoryId} className="mb-4">
                <h3 className="font-semibold mb-2">{cat.title}</h3>
                {
                cat.itemCards.map(({ card: { info } }) => (
                      <div key={info?.id || info?.name} className="py-9 border-b flex ">
               
                <div className="flex flex-col gap-1 ">
                  <span
                    className={`w-3 h-3 border rounded-sm flex items-center justify-center 
                                ${info?.itemAttribute?.vegClassifier === 'VEG' 
                                    ? 'border-green-600' 
                                    : 'border-red-600'}`}>
                        <span
                          className={`w-1.5 h-1.5 rounded-full 
                                      ${info?.itemAttribute?.vegClassifier === 'VEG' 
                                          ? 'bg-green-600' 
                                          : 'bg-red-600'}`}
                        ></span>
                  </span>
                 <p className="font-semibold text-[18px]">{info?.name}</p>
                 {(info?.defaultPrice || info?.price) && (
                          <p className="font-semibold text-[15px]">
                            ₹{(info?.defaultPrice || info?.price) / 100}
                          </p>
                        )}

                

               
                 {info?.ratings?.aggregatedRating?.rating && (
                        <p className="text-[13px]">
                          <FontAwesomeIcon icon={faStar} className="text-green-500" />{" "}
                          {info?.ratings?.aggregatedRating?.rating} (
                          {info?.ratings?.aggregatedRating?.ratingCountV2})
                        </p>
                      )}

                  <div className="  text-gray-500 text-sm  w-[570px] ">
                    {
                      <ExpandableText text={info?.description} maxChars={120} />

                    }             
                </div>
                </div>
                <div className="relative w-40 ml-auto">
                  <button className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white border text-green-600 font-semibold px-9 py-2 rounded-lg shadow">ADD </button>
                  <img  className="w-40 h-28 rounded-lg object-cover" src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,c_fit/" + info?.imageId } />
                   

                </div>
                

              </div>
                ))
                }
              </div>
            ))
          )}
        </div>
      )}
    </div>
    
  );


}




export default RestaurantMenu;
