import { useState, useEffect } from "react";

function Pizza({ pizza }) {
  //console.log(props);
  return <p>This is a {pizza.name} Pizza</p>;
}

export default function FoodList() {
  const [foodData, setFoodData] = useState();
  const [pizzaData, setPizzaData] = useState();

  async function loadFood() {
    const response = await fetch("/data/food.json");
    //console.log(response);
    const data = await response.json();
    //console.log(data);
    setFoodData(data);
  }

  async function loadPizzas() {
    const response = await fetch("/data/pizzas.json");
    //console.log(response);
    const data = await response.json();
    //console.log(data);
    setPizzaData(data);
  }

  useEffect(() => {
    loadFood();
    loadPizzas();
  }, []);

  const markAsSoldOut = (pizzaName) => {
    setFoodData((prevData) => ({
      //modify the pizzas: property
      pizzas: prevData.pizzas.map((pizza) =>
        pizza.name === pizzaName ? { ...pizza, soldout: "yes" } : pizza
      ),
    }));
  };

  return (
    <div>
      <h1>Use a key to access a pizza in pizzas.json</h1>
      {/* need to ensure that pizzaData is loaded, therefore "pizzaData &&" is required if loading from file and not declaring variable  */}
      {pizzaData && <Pizza pizza={pizzaData["Margharita"]} />}
      <h1>Filter in food.json</h1>
      {foodData && (
        <>
          <Pizza
            pizza={foodData.pizzas.filter((p) => p.name === "Prosciutto")[0]}
          />
          {/* another option to achieve the same filter */}
          <Pizza
            pizza={foodData["pizzas"].filter((p) => p.name === "Prosciutto")[0]}
          />
        </>
      )}
      <h1>Loop through pizzas in food.json</h1>
      {foodData &&
        foodData.pizzas.map((pizza) => (
          <div key={pizza.name}>
            <Pizza pizza={pizza} />
            <p>Sold out: {pizza.soldout}</p>
            <button onClick={() => markAsSoldOut(pizza.name)}>
              Mark as Sold Out
            </button>
          </div>
        ))}
    </div>
  );
}
