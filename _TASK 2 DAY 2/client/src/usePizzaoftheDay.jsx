import { useState, useEffect } from "react";

export const usePizzaoftheDay = () => {
  const [pizzaoftheDay, setPizzaoftheDay] = useState(null);

  useEffect(() => {
    async function fetchPizzaoftheDay() {
      const response = await fetch("/api/pizza-of-the-day");
      const resJson = await response.json();
      setPizzaoftheDay(resJson);
    }

    fetchPizzaoftheDay();
  }, []);

  return pizzaoftheDay;
};
