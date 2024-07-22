"use client";
import React, { useState, useEffect } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';
import { getItems, addItem } from '../_services/shopping-list-service';

const ShoppingList = ({ user }) => {
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState("");

  const loadItems = async () => {
    try {
      const items = await getItems(user.uid);
      setItems(items);
    } catch (error) {
      console.error("Error loading items: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadItems();
    }
  }, [user]);

  const handleAddItem = async (newItem) => {
    try {
      const itemId = await addItem(user.uid, newItem);
      setItems(prevItems => [...prevItems, { id: itemId, ...newItem }]);
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  const handleItemSelect = (item) => {
    const cleanedName = item.name.split(',')[0].trim().replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="min-h-screen bg-slate-900 p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
      <div className="flex">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="w-1/2 pl-4">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
};

export default ShoppingList;
