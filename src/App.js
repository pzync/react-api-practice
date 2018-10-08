import React, { Component } from "react";
import "./App.css";
import FoodItem from "./components/foodItem";

const API_KEY = `38348c8d8e6066fe42fcd7fb4a2375bc`;

class App extends Component {
  state = {
    foodItems: [],
    hasLoaded: false
  };

  async componentDidMount() {
    const api_call = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.food2fork.com/api/search?key=${API_KEY}&q=chicken&count=15`
    );
    const data = await api_call.json();
    this.setState({ foodItems: data.recipes, hasLoaded: true });
    // console.log(data.recipes);
  }

  render() {
    const { foodItems, hasLoaded } = this.state;
    return (
      <div className="App">
        <h1>Your Recipes</h1>
        <div className="card-list">
          {hasLoaded && foodItems.length
            ? foodItems.map(f => (
                <FoodItem
                  key={f.recipe_id}
                  title={f.title}
                  image={f.image_url}
                  publisher={f.publisher}
                />
              ))
            : `Loading recipes...`}
        </div>
      </div>
    );
  }
}

export default App;
