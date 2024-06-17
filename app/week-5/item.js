import React from 'react';

const Item = ({ name, quantity, category }) => {
  return (
    <li className="mb-4 last:mb-0">
      <div className="w-1/5 bg-slate-800 border p-2 border-slate-800">
        <div className="font-bold text-lg">{name}</div>
        <div className="text-white-600">Buy {quantity} in {category}</div>
      </div>
    </li>
  );
};

export default Item;
