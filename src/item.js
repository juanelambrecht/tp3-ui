import React from "react";
import "./card.css";
class Item extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();

    this.props.addCartItem(this.props.item);
  }

  render() {
    return (
      <div class="col">
        <br></br>
        <div className="card text-center bg-dark animate__animated animate__fadeInUp">
          <div className="overflow">
            <img
              src="https://cdn-icons-png.flaticon.com/128/4689/4689730.png"
              alt="a wallpaper"
            />
          </div>
          <div className="card-body text-light">
            <h4 className="card-title"> {this.props.item.descripcion + " "}</h4>
            <p className="card-text text-secondary">
              Precio {this.props.item.precio + "$  "}
            </p>
            <button type="button" class="btn btn-light">
              <a onClick={this.handleClick}> Agregar</a>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
