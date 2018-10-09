import React, { Component } from "react";
import "./App.css";
import FoodItem from "./components/foodItem";

const API_KEY = `22bb85986e161bafa350f51ba4c4c0a4`;

class App extends Component {
  state = {
    foodItems: [],
    hasLoaded: false,
    likeCount: 0
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
    // to update the like status of a foodItem
    const foodItems = [...this.state.foodItems];
    const index = foodItems.indexOf(foodItem);
    foodItems[index] = { ...foodItem };
    foodItems[index].liked = !foodItems[index].liked;

    // to update the likeCount of the list
    const likeCount = foodItems.filter(f => f.liked).length;

    // to update the state
    this.setState({ foodItems, likeCount });
  };

  render() {
    const { foodItems, hasLoaded, likeCount } = this.state;
    return (
      <div className="App">
        <h1>Your Recipes</h1>
        <React.Fragment>
          {likeCount ? (
            <div>
              <h2>
                Favorites(
                {likeCount})
              </h2>
              <div className="card-list fav-list">
                {foodItems.filter(f => f.liked).map(f => (
                  <FoodItem
                    key={f.recipe_id}
                    title={f.title}
                    image={f.image_url}
                    publisher={f.publisher}
                    liked={f.liked}
                    onLike={() => this.handleLike(f)}
                  />
                ))}
              </div>
              <hr />
              <h2>All Recipes</h2>
            </div>
          ) : null}
        </React.Fragment>
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
