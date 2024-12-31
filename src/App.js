import FoodList from "./pages/FoodList";
import FoodOrder from "./pages/FoodOrder";
import PizzaList from "./pages/PizzaList";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <PizzaList />
      <FoodList />
      <FoodOrder />
    </div>
  );
}
