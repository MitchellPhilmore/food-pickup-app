interface Category {
  id: number;
  name: string;
}

interface MenuCategoryProps {
  category: Category;
  onClick: () => void;
  isSelected: boolean;
}

const MenuCategory = ({ category, onClick, isSelected }: MenuCategoryProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 border rounded-lg shadow transition-colors ${
        isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'
      }`}
    >
      <h2 className="text-lg font-semibold">{category.name}</h2>
    </button>
  );
};

export default MenuCategory;