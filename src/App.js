import FoodList from "./pages/FoodList";
import FoodOrder from "./pages/FoodOrder";
import PizzaList from "./pages/PizzaList";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h2>My Header</h2>
        </div>
        <div className="menu">
          <a href="#">Link 1</a>
          <br />
          <a href="#">Link 2</a>
          <br />
          <a href="#">Link 3</a>
        </div>
        <div className="content">
          <PizzaList />
          <FoodList />
          <FoodOrder />
        </div>
        <div className="footer">
          <h4>Footer</h4>
        </div>
      </div>
    </div>
  );
}
