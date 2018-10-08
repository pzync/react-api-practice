import React from "react";
import "./foodItem.css";

const FoodItem = ({ title, image, publisher }) => {
  return (
    <div className="food-item-card">
      <img src={image} alt="Card" className="card-image" />
      <h3>{title.length > 25 ? `${title.substr(0, 23)}..` : title}</h3>
      <p>{publisher}</p>

      <button>ADD</button>
    </div>
  );
};

export default FoodItem;
