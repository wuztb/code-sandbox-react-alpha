import { useState, useEffect } from "react";

function Pizza({ pizza }) {
  //console.log(props);
  return <p>This is a {pizza.name} Pizza</p>;
}

export default function PizzaList() {
  const [pizzaData, setPizzaData] = useState();

  async function loadPizzas() {
    const response = await fetch("/data/pizzas.json");
    //console.log(response);
    const data = await response.json();
    //console.log(data);
    setPizzaData(data);
  }

  useEffect(() => {
    loadPizzas();
  }, []);

  const markAsSoldOut = (pizzaName) => {
    setPizzaData((prevData) => ({
      ...prevData,
      [pizzaName]: {
        ...prevData[pizzaName],
        status: "soldout",
      },
    }));
  };

  const removeSoldOut = (pizzaName) => {
    setPizzaData((prevData) => {
      const { status, ...pizzaDetails } = prevData[pizzaName]; // Destructure to exclude `status`
      return {
        ...prevData,
        [pizzaName]: pizzaDetails,
      };
    });
  };

  return (
    <div>
      <h1>Use a key to access a pizza in pizzas.json</h1>
      {/* need to ensure that pizzaData is loaded, therefore "pizzaData &&" is required if loading from file and not declaring variable  */}
      {pizzaData && <Pizza pizza={pizzaData["Margharita"]} />}
      <h1>Loop through pizzas in pizzas.json</h1>
      {pizzaData &&
        Object.entries(pizzaData).map(([key, pizza]) => (
          <div
            key={pizza.name}
            /* Use Template Literals (${}) When: You need to combine multiple classes: */
            className={`pizza-item ${
              pizza.status === "soldout" ? "soldout" : ""
            }`}
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
