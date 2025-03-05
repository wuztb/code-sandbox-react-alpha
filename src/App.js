import FoodList from "./pages/FoodList";
import FoodOrder from "./pages/FoodOrder";
import PizzaList from "./pages/PizzaList";
import DummyJson from "./pages/DummyJson";
import AppTravelList from "./pages/travel-list/AppTravelList";
import AppEatNSplit from "./pages/eat-n-split/AppEatNSplit";
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
          <br />
          <a href="pageDummyJson">Dummy Jason from API</a>
          <br />
          <a href="pageTravelList">Travel-List</a>
          <br />
          <a href="pageEatNSplit">Eat-n-Split</a>
        </div>
        <div className="content">
          <Router>
            <Routes>
              <Route path="page1" element={<PizzaList />} />
              <Route path="page2" element={<FoodList />} />
              <Route path="page3" element={<FoodOrder />} />
              <Route path="pageDummyJson" element={<DummyJson />} />
              <Route path="pageTravelList" element={<AppTravelList />} />
              <Route path="pageEatNSplit" element={<AppEatNSplit />} />
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
