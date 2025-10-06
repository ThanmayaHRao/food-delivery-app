import Head from './component/Head.jsx';
import Body from './component/Body.jsx';
import { Routes, Route } from 'react-router-dom';
import RestaurantMenu from './component/RestaurantMenu.jsx';
import { Visiblity } from './context/contextAPI.js';
import { useState } from 'react';
import { Coordinates } from './context/contextAPI.js';

function App() {
  const [visible,setvisible] = useState(false)
  const [coordinates,setcoordinates] = useState({lat :12.9147078,lng :77.61344})
  return (
    <Coordinates.Provider value={{coordinates,setcoordinates}}> 
      <Visiblity.Provider value={{visible,setvisible}}>
        <div className={visible ? "overflow-hidden max-h-screen": ""}>
        <Routes>
        <Route path="/" element={<Head />}>
          {/* 👇 use index for default route */}
          <Route index element={<Body />} /> 
          <Route path = '/restaurantMenu/:id' element = {<RestaurantMenu/>}/>
        </Route>
      </Routes>
      </div>
      </Visiblity.Provider>
   </Coordinates.Provider>
   
  );
}

export default App;
