"use client";
import React, { useState } from "react";

const NewItem = () => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("Produce");

    const handleSubmit = (event) => {
        event.preventDefault();

        const item = {
            name,
            quantity,
            category,
        };

        console.log('Form Submitted', item);
        alert(`Added Item: ${name}, Quantity: ${quantity}, Category: ${category}`);

        setName('');
        setQuantity(1);
        setCategory('Produce');
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24 ">
            <form className = " w-96 border rounded-lg p-3 bg-slate-800" onSubmit={handleSubmit}>
                <div className="pb-3">
                    <label>
                        <input className="text-black pl-2 rounded-md w-full h-9"
                            placeholder="Item Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="pb-3">
                    <label>
                        <input className="text-black pl-2 h-10 rounded-md"
                            placeholder="1"
                            type="number"
                            min="1"
                            max="99"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                        />
                    </label>
                </div>
                <div className="pb-3">
                    <label>
                        <select className="text-black h-10 rounded-md"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Produce">Produce</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Bakery">Bakery</option>
                            <option value="Meat">Meat</option>
                            <option value="Frozen Foods">Frozen Foods</option>
                            <option value="Canned Goods">Canned Goods</option>
                            <option value="Dry Goods">Dry Goods</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Household">Household</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>
                <button className="bg-blue-600 pl-2 rounded-md w-full h-9" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewItem;
