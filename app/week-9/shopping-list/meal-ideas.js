"use client";

import React, { useState, useEffect } from 'react';

const fetchMealIdeas = async (ingredient) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  return data.meals;
};

const fetchMealDetails = async (mealId) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await response.json();
  return data.meals[0];
};

const MealIdeas = ({ ingredient }) => {
  const [meals, setMeals] = useState([]);
  const [visibleImage, setVisibleImage] = useState(null);
  const [mealDetails, setMealDetails] = useState({});

  const loadMealIdeas = async () => {
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
    setVisibleImage(null);
  };

  useEffect(() => {
    if (ingredient) {
      loadMealIdeas();
    }
  }, [ingredient]);

  const toggleImageVisibility = async (mealId) => {
    if (visibleImage === mealId) {
      setVisibleImage(null);
      setMealDetails({});
    } else {
      setVisibleImage(mealId);
      if (!mealDetails[mealId]) {
        const details = await fetchMealDetails(mealId);
        setMealDetails(prevState => ({
          ...prevState,
          [mealId]: details
        }));
      }
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold pb-2'>
        {ingredient ? `Meal Ideas for ${ingredient}` : 'Please select an ingredient'}
      </h1>
      <ul>
        {meals && meals.map(meal => (
          <li className='pb-5 flex' key={meal.idMeal}>
            <div className="mr-4">
              <p 
                className="text-white-500 w-96 bg-slate-800 border p-2 border-slate-800 cursor-pointer hover:bg-orange-800"
                onClick={() => toggleImageVisibility(meal.idMeal)}
              >
                {meal.strMeal}
              </p>
              {visibleImage === meal.idMeal && (
                <img className="size-64 pt-2" src={meal.strMealThumb} alt={meal.strMeal} />
              )}
            </div>
            {visibleImage === meal.idMeal && (
              <div className='w-96 bg-slate-800 border p-2 border-slate-800'>
                <h1 className="text-xl font-bold mt-2">Ingredients:</h1>
                <ul className="text-white">
                  {mealDetails[meal.idMeal]?.strIngredient1 && (
                    <li>{mealDetails[meal.idMeal].strIngredient1} - {mealDetails[meal.idMeal].strMeasure1}</li>
                  )}
                  {mealDetails[meal.idMeal]?.strIngredient2 && (
                    <li>{mealDetails[meal.idMeal].strIngredient2} - {mealDetails[meal.idMeal].strMeasure2}</li>
                  )}
                  {mealDetails[meal.idMeal]?.strIngredient3 && (
                    <li>{mealDetails[meal.idMeal].strIngredient3} - {mealDetails[meal.idMeal].strMeasure3}</li>
                  )}
                  {mealDetails[meal.idMeal]?.strIngredient4 && (
                    <li>{mealDetails[meal.idMeal].strIngredient4} - {mealDetails[meal.idMeal].strMeasure4}</li>
                  )}
                  {mealDetails[meal.idMeal]?.strIngredient5 && (
                    <li>{mealDetails[meal.idMeal].strIngredient5} - {mealDetails[meal.idMeal].strMeasure5}</li>
                  )}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealIdeas;
