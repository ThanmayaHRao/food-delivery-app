import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Restaurentscard from './Restaurentscard';
import { Coordinates } from '../context/contextAPI';

function Toprestaurent() {
  const [restaurants, setRestaurants] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const { coordinates: { lat, lng } } = useContext(Coordinates);

  // ✅ Fetch restaurant data safely
  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(`/api-d/restaurants/list/v5?lat=${lat}&lng=${lng}`);
      const result = await res.json();

      // ✅ Safely extract restaurants array from nested response
      const restaurantList =
        result?.data?.cards?.find(
          (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setRestaurants(restaurantList);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Refetch when coordinates change
  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  // ✅ Handle empty / loading states
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40 text-orange-500 font-semibold">
        Loading top restaurants...
      </div>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No top restaurants found in this area.
      </div>
    );
  }

  // ✅ Scroll handlers
  const handlePrev = () => {
    if (value >= 0) return;
    setValue((prev) => prev + 280);
  };

  const handleNext = () => {
    if (value <= -((restaurants.length - 4) * 280)) return; // prevent overscroll
    setValue((prev) => prev - 280);
  };

  return (
    <div className="w-full mt-14">
      <div>
        <div className="text-xl font-bold mt-4 flex justify-between">
          <h1>Top restaurant chains in your city</h1>

          <div className="flex gap-4">
            {/* Left Arrow */}
            <div
              onClick={handlePrev}
              className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer 
              ${value >= 0 ? "bg-gray-300 text-gray-400 cursor-not-allowed" : "bg-slate-200 text-gray-800"}`}
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
            </div>

            {/* Right Arrow */}
            <div
              onClick={handleNext}
              className={`rounded-full w-10 h-10 flex items-center justify-center cursor-pointer
              ${value <= -((restaurants.length - 4) * 280)
                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-slate-200 text-gray-800"
              }`}
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
            </div>
          </div>
        </div>

        {/* ✅ Scrollable restaurant cards */}
        <div
          className="flex mt-4 gap-2 transform transition-transform duration-500 ease-out"
          style={{ transform: `translateX(${value}px)` }}
        >
          {restaurants.map((restro, idx) => (
            <Restaurentscard key={restro?.info?.id || idx} restro={restro} />
          ))}
        </div>

        <hr className="border mt-6" />
      </div>
    </div>
  );
}

export default Toprestaurent;
