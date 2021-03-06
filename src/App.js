import React, { Component } from "react";
import "./App.css";
import FoodItem from "./components/foodItem";
import Modal from "./components/modal";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const API_KEY = `38348c8d8e6066fe42fcd7fb4a2375bc`;

class App extends Component {
  state = {
    foodItems: [],
    hasLoaded: false,
    likeCount: 0,
    activeItem: {},
    showModal: false
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

  handleShow = foodItem => {
    this.setState({ activeItem: foodItem, showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      foodItems,
      hasLoaded,
      likeCount,
      activeItem,
      showModal
    } = this.state;
    return (
      <div className="App">
        <h1>Your Recipes</h1>
        <CSSTransition in={likeCount > 0} timeout={500} classNames="favSec">
          <React.Fragment>
            {likeCount ? (
              <div>
                <h2>
                  Favorites(
                  {likeCount})
                </h2>
                <div>
                  <TransitionGroup className="card-list fav-list">
                    {foodItems.filter(f => f.liked).map(f => (
                      <CSSTransition
                        key={f.recipe_id}
                        timeout={500}
                        classNames="favAnim"
                      >
                        <FoodItem
                          key={f.recipe_id}
                          title={f.title}
                          image={f.image_url}
                          publisher={f.publisher}
                          liked={f.liked}
                          onLike={() => this.handleLike(f)}
                          onShow={() => this.handleShow(f)}
                        />
                      </CSSTransition>
                    ))}
                  </TransitionGroup>
                </div>
                <hr />
                <h2>All Recipes</h2>
              </div>
            ) : null}
          </React.Fragment>
        </CSSTransition>
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
                  onShow={() => this.handleShow(f)}
                />
              ))
            : `Loading recipes...`}
        </div>
        <Modal
          showModal={showModal}
          itemToDisplay={activeItem}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default App;
