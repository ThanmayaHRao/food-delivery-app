import React, { useState, useEffect, useContext } from "react";
import Restaurentscard from "./Restaurentscard";
import { Coordinates } from "../context/contextAPI";

function OnlinefoodDelivery() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { coordinates: { lat, lng } } = useContext(Coordinates);

  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(`/api-d/restaurants/list/v5?lat=${lat}&lng=${lng}`);
      const result = await res.json();

      // ✅ Safely find the correct section that contains restaurants
      const restaurantSection = result?.data?.cards?.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants
      );

      const restaurants =
        restaurantSection?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setData(restaurants);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
    }
  }

  // 🔁 Refetch every time lat/lng changes
  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  return (
    <div className="w-full mt-16">
      <div>
        <div className="text-xl font-bold mt-4 flex justify-between">
          <h1>Restaurants with online food delivery near you</h1>
        </div>

        {/* Loader */}
        {loading && (
          <div className="text-center text-orange-500 font-semibold mt-10">
            Loading restaurants...
          </div>
        )}

        {/* No restaurants found */}
        {!loading && data.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No restaurants found for this area.
          </div>
        )}

        {/* Render restaurant cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-4 gap-6 place-items-start">
          {data.map((restro, idx) => (
            <Restaurentscard key={restro?.info?.id || idx} restro={restro} />
          ))}
        </div>

        <hr className="border mt-6" />
      </div>
    </div>
  );
}

export default OnlinefoodDelivery;
