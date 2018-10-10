import React, { Component } from "react";
import "./modal.css";

class Modal extends Component {
  // state = {  }
  render() {
    const {
      title,
      image_url,
      source_url,
      publisher
    } = this.props.itemToDisplay;

    if (!this.props.showModal) return null;

    return (
      <div className="modal-block">
        <button className="close-button" onClick={this.props.onClose}>
          Close
        </button>
        <img src={image_url} alt="Card" className="modal-image" />
        <h3 className="modal-title">{title}</h3>
        <p
          style={{
            color: "#42444880",
            fontStyle: "italic",
            marginBottom: "10px"
          }}
        >
          via {publisher}
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has...
        </p>
        <a href={source_url}>Go to website</a>
      </div>
    );
  }
}

export default Modal;
