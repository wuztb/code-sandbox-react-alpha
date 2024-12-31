import { useState, useEffect } from "react";

function Pizza({ pizza }) {
  //console.log(props);
  return <p>This is a {pizza.name} Pizza</p>;
}

export default function FoodList() {
  const [foodData, setFoodData] = useState();

  async function loadFood() {
    const response = await fetch("/data/food.json");
    //console.log(response);
    const data = await response.json();
    //console.log(data);
    setFoodData(data);
  }

  useEffect(() => {
    loadFood();
  }, []);

  const markAsSoldOut = (pizzaName) => {
    setFoodData((prevData) => ({
      //modify the pizzas: property
      pizzas: prevData.pizzas.map((pizza) =>
        pizza.name === pizzaName ? { ...pizza, status: "soldout" } : pizza
      ),
    }));
  };

  const removeSoldOut = (pizzaName) => {
    setFoodData((prevData) => ({
      pizzas: prevData.pizzas.map((pizza) => {
        if (pizza.name === pizzaName) {
          const { status, ...rest } = pizza; // Remove soldout property
          return rest;
        }
        return pizza;
      }),
    }));
  };

  return (
    <div>
      <h1>Filter in food.json</h1>
      {foodData && (
        <>
          <span>Filter Option 1: </span>
          <Pizza
            pizza={foodData.pizzas.filter((p) => p.name === "Prosciutto")[0]}
          />
          {/* another option to achieve the same filter */}
          <span>Filter Option 2: </span>
          <Pizza
            pizza={foodData["pizzas"].filter((p) => p.name === "Prosciutto")[0]}
          />
        </>
      )}
      <h1>Loop through pizzas in food.json</h1>
      {foodData &&
        foodData.pizzas.map((pizza) => (
          <div
            key={pizza.name}
            className={pizza.status === "soldout" ? "soldout" : ""}
          >
            <Pizza pizza={pizza} />
            {pizza.status === "soldout" ? (
              <>
                <p>{pizza.status}</p>
                <button onClick={() => removeSoldOut(pizza.name)}>
                  Remove Sold Out
                </button>
              </>
            ) : (
              <button onClick={() => markAsSoldOut(pizza.name)}>
                Mark as Sold Out
              </button>
            )}
          </div>
        ))}
    </div>
  );
}
