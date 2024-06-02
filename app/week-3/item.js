import React from 'react';

const Item = ({ name, quantity, category }) => {
  return (
    <li className="mb-4 last:mb-0">
        <div className="max-w-[calc(50%-2rem)] bg-stone-600 border p-2 border-stone-600">
            <div className="font-medium text-lg">{name}</div>
            <div className="text-white-600">Buy {quantity} in {category}</div>
        </div>
    </li>
  );
};

export default Item;
