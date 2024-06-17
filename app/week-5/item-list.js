import React, { useState } from 'react';
import Item from './item';
import items from './items.json';

const ItemList = () => {
  const [sortBy, setSortBy] = useState("name");
  const [groupByCategory, setGroupByCategory] = useState(false);

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  const groupedItems = sortedItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedItems).sort();

  const handleSortBy = (value) => {
    setSortBy(value);
    setGroupByCategory(false);
  };

  const handleGroupByCategory = () => {
    setSortBy("name");
    setGroupByCategory(true);
  };

  return (
    <div>
      <h2>Sort by</h2>
      <div className="mb-4">
        <button className="rounded-lg" onClick={() => handleSortBy("name")} style={{ backgroundColor: sortBy === "name" && !groupByCategory ? 'blue' : 'gray', color: 'white', marginRight: '10px', padding: '10px' }}>
          Name
        </button>
        <button className="rounded-lg" onClick={() => handleSortBy("category")} style={{ backgroundColor: sortBy === "category" && !groupByCategory ? 'blue' : 'gray', color: 'white', padding: '10px' }}>
          Category
        </button>
        <button className="rounded-lg" onClick={handleGroupByCategory} style={{ backgroundColor: groupByCategory ? 'blue' : 'gray', color: 'white', marginLeft: '10px', padding: '10px' }}>
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
                  <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
                ))}
              </ul>
            </li>
          ))
        ) : (
          sortedItems.map(item => (
            <Item key={item.id} name={item.name} quantity={item.quantity} category={item.category} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;
