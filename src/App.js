import "./styles.css";

export default function App() {
  const pizzas = [
    {
      name: "Salami",
      price: 12,
    },
    {
      name: "Margharita",
      price: 9,
    },
  ];

  const pizzas2 = {
    Salami: {
      name: "Salami",
      price: 12,
    },
    Margharita: {
      name: "Margharita",
      price: 9,
    },
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <Pizza pizza={pizzas.filter((p) => p.name === "Salami")[0]} />
      <Pizza pizza={pizzas2["Margharita"]} />
    </div>
  );
}

function Pizza(props) {
  console.log(props);
  return <h1>This is a {props.pizza.name} Pizza</h1>;
}
