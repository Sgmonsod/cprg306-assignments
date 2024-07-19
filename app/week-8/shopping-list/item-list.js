import React, { useState } from 'react';
import Item from './item';

const ItemList = ({ items, onItemSelect }) => {
  const [sortBy, setSortBy] = useState("name");
  const [groupByCategory, setGroupByCategory] = useState(false);

  const handleSortBy = (value) => {
    setSortBy(value);
    setGroupByCategory(false);
  };

  const handleGroupByCategory = () => {
    setSortBy("name");
    setGroupByCategory(true);
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  const groupedItems = sortedItems.reduce((acc, item) => {
    const { category } = item;
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedItems).sort();

  return (
    <div>
      <h2>Sort by</h2>
      <div className="mb-4">
        <button
          className={`rounded-lg ${sortBy === 'name' && !groupByCategory ? 'bg-blue-500' : 'bg-gray-500'} text-white mr-2 px-4 py-2`}
          onClick={() => handleSortBy("name")}
        >
          Name
        </button>
        <button
          className={`rounded-lg ${sortBy === 'category' && !groupByCategory ? 'bg-blue-500' : 'bg-gray-500'} text-white px-4 py-2`}
          onClick={() => handleSortBy("category")}
        >
          Category
        </button>
        <button
          className={`rounded-lg ${groupByCategory ? 'bg-blue-500' : 'bg-gray-500'} text-white ml-2 px-4 py-2`}
          onClick={handleGroupByCategory}
        >
          Group by Category
        </button>
      </div>
      <ul>
        {groupByCategory ? (
          sortedCategories.map(category => (
            <li key={category} className="mb-4">
              <h3 className="capitalize font-bold text-xl">{category}</h3>
              <ul>
                {groupedItems[category].map(item => (
                  <Item key={item.id} {...item} onSelect={() => onItemSelect(item)} />
                ))}
              </ul>
            </li>
          ))
        ) : (
          sortedItems.map(item => (
            <Item key={item.id} {...item} onSelect={() => onItemSelect(item)} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;
