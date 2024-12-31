import FoodList from "./pages/FoodList";
import PizzaList from "./pages/PizzaList";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <PizzaList />
      <FoodList />
    </div>
  );
}
