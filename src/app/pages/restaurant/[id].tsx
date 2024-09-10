"use client"
import { useRouter } from "next/router";

const RestaurantMenu = () => {
  const router = useRouter();
  const { id } = router.query;

  // Fetch menu items based on restaurant ID (to be implemented)

  return (
    <div>
      <h1>Menu for Restaurant ID: {id}</h1>
      {/* Display menu items here */}
    </div>
  );
};

export default RestaurantMenu;