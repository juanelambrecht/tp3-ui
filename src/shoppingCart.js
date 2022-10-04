import React from "react";

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleCheckout();
  }

  render() {
    const img_card = {
      width: "50px",
      padding: "10px",
    };
    return (
      <div onClick={this.handleClick}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/2098/2098566.png"
          style={img_card}
        />
        Carro ({this.props.cartItems.length})
      </div>
    );
  }
}

export default ShoppingCart;
