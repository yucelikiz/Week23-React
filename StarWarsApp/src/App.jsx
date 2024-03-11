import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShipCards from "./components/ShipCards";
import SpaceshipDetails from "./components/SpaceshipDetails";
import API from "../src/components/API";
import "./App.css";

function App() {
  const [starships, setStarships] = useState([]);

  const fetchStarships = async () => {
    try {
      const data = await API.getStarships();
      setStarships(data.results);
    } catch (error) {
      console.error("Error fetching starships:", error);
    }
  };

  const handleSearch = async (query) => {
    try {
      const data = await API.searchStarships(query);
      setStarships(data.results);
    } catch (error) {
      console.error("Error searching starships:", error);
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<ShipCards starships={starships} />}
          />
          <Route
            path="/spaceship/:name"
            element={<SpaceshipDetails getStarshipDetails={API.getStarshipDetails} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
