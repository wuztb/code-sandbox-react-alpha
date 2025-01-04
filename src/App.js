import FoodList from "./pages/FoodList";
import FoodOrder from "./pages/FoodOrder";
import PizzaList from "./pages/PizzaList";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h2>My Header</h2>
        </div>
        <div className="menu">
          <a href="page1">Page 1 pizza.json</a>
          <br />
          <a href="page2">Page 2 food.json</a>
          <br />
          <a href="page3">Page 3 form fun</a>
        </div>
        <div className="content">
          <Router>
            <Routes>
              <Route path="page1" element={<PizzaList />} />
              <Route path="page2" element={<FoodList />} />
              <Route path="page3" element={<FoodOrder />} />
            </Routes>
          </Router>
        </div>
        <div className="footer">
          <h4>Footer</h4>
        </div>
      </div>
    </div>
  );
}
