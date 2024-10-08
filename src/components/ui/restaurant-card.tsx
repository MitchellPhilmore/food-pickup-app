import Link from "next/link";
import Image from 'next/image';

interface Restaurant {
  id: string;
  name: string;
  image: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <Image 
        src={restaurant.image} 
        alt={restaurant.name} 
        width={300} 
        height={200} 
        layout="responsive"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{restaurant.name}</h2>
        <Link href={`/restaurant/${restaurant.id}`}>
          View Menu
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;