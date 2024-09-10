import Link from "next/link";

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img src={restaurant.image} alt={restaurant.name} width={300} height={200} />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{restaurant.name}</h2>
        <Link href={`/restaurant/${restaurant.id}`}>
          View Menu {/* Removed <a> tag to fix the invalid Link issue */}
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;