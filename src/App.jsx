import Head from './component/Head.jsx';
import Body from './component/Body.jsx';
import { Routes, Route } from 'react-router-dom';
import RestaurantMenu from './component/RestaurantMenu.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Head />}>
        {/* 👇 use index for default route */}
        <Route index element={<Body />} /> 
        <Route path = '/restaurantMenu/:id' element = {<RestaurantMenu/>}/>
      </Route>
    </Routes>
  );
}

export default App;
