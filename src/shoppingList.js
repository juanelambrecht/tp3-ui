import React from "react";
import CartItem from "./cartItem";
import "./lista.css";

class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      resultado: "",
    };
  }

  handleClick() {
    this.props.toggleCheckout();
  }

  handleChange(e) {
    let nombre = e.target.name;
    let valor = e.target.value;

    this.setState((state) => ({
      form: {
        ...state.form,
        [nombre]: valor,
      },
    }));
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   fetch("http://localhost:1234/ventaNueva?cliente=1004&tarjeta=1005", {
  //     method: "POST",
  //     body: JSON.stringify(products),
  //   })
  //     .then((resp) => resp.json())
  //     .then((json) => {
  //       this.setState({
  //         cursos: json.personas,
  //         resultado: json.result,
  //       });
  //     });
  // }

  handleSubmit(e) {
    e.preventDefault();
    console.log(
      this.props.cartItems.map((cartItem) => {
        return cartItem.item.id;
      })
    );
    // this.props.cartItems.map((cartItem) => {
    //   console.log(cartItem.item.id);

    // });

    fetch("http://localhost:1234/ventaNueva?cliente=1004&tarjeta=1005", {
      method: "POST",
      body: JSON.stringify(
        this.props.cartItems.map((cartItem) => {
          return cartItem.item.id;
        })
      ),
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.result === "error") {
          this.setState({
            resultado: json.message,
          });
          return;
        }
        this.setState({
          resultado: "Venta creada con éxito!",
        });
      });
  }

  render() {
    let totalPrice = 0;
    const cartItems = this.props.cartItems.map((cartItem) => {
      totalPrice += cartItem.item.precio * cartItem.quantity;
      return (
        <CartItem
          key={cartItem.item.key}
          cartItem={cartItem}
          changeCartItemQuantity={this.props.changeCartItemQuantity}
          removeCartItem={this.props.removeCartItem}
        />
      );
    });
    return (
      <container>
        <div id="generic_price_table">
          <section>
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <div class="price-heading clearfix">
                    <h1>
                      CheckOut <span>V2.1</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col">
                  <div class="generic_content active clearfix">
                    <div class="generic_head_price clearfix">
                      <div class="generic_head_content clearfix">
                        <div class="head_bg"></div>
                        <div class="head">
                          <span>Terminar Compra...</span>
                        </div>
                      </div>

                      <div class="generic_price_tag clearfix">
                        <span class="price">
                          <span class="sign">$</span>
                          <span class="currency">{totalPrice}</span>
                          <span class="cent">.00</span>
                        </span>
                      </div>
                    </div>

                    <div class="generic_feature_list">
                      <ul>
                        <li>
                          <div>{cartItems}</div>
                          <div>Precio total: {totalPrice + "$"}</div>
                          <a onClick={this.handleClick}>Volver a tienda</a>
                        </li>
                        <li>
                          <span>Para realizar la compra</span> oprima el
                          siguiente boton
                        </li>
                      </ul>
                    </div>

                    <div class="generic_price_btn clearfix">
                      <a onClick={this.handleSubmit}>Finalizar Compra</a>
                    </div>
                    <div>{this.state.resultado}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </container>
    );
  }
}

export default ShoppingList;
