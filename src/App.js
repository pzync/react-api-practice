import React, { Component } from "react";
import "./App.css";
import FoodItem from "./components/foodItem";

const API_KEY = `01efc9c4b510d2af1a7cf4971f96559b`;

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
    const foodItems = data.recipes.map(d => {
      return { ...d, liked: false };
    });
    // console.log(foodItems);
    this.setState({ foodItems, hasLoaded: true });
  }

  handleLike = foodItem => {
    const foodItems = [...this.state.foodItems];
    const index = foodItems.indexOf(foodItem);
    foodItems[index] = { ...foodItem };
    foodItems[index].liked = !foodItems[index].liked;
    this.setState({ foodItems });
  };

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
                  liked={f.liked}
                  onLike={() => this.handleLike(f)}
                />
              ))
            : `Loading recipes...`}
        </div>
      </div>
    );
  }
}

export default App;
