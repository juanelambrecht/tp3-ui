import React from "react";

class CartItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.props.changeCartItemQuantity(
      this.props.cartItem.item.id,
      event.target.value
    );
  }

  handleClick(event) {
    this.props.removeCartItem(this.props.cartItem.item.id);
  }

  render() {
    return (
      <div>
        <span>{this.props.cartItem.item.descripcion + " "}</span>
        <span>Precio c/u: {this.props.cartItem.item.precio + "$ "}</span>
        <br></br>
        Cantidad
        <input
          min="1"
          onChange={this.handleChange}
          type="number"
          value={this.props.cartItem.quantity}
        />
        <button type="button" class="btn btn-light btn-circle btn-sm">
          <span onClick={this.handleClick}>Remover</span>
        </button>
      </div>
    );
  }
}

export default CartItem;
