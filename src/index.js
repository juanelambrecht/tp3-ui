import React from "react";
import ReactDOM from "react-dom";
import ShoppingList from "./shoppingList";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Productos from "./productos";
import Promociones from "./promociones";
import Tarjetas from "./tarjetas";
import "./card.css";

var DEFAULT_CATEGORY = { key: "default", name: "Cualquier categoría" };

var ITEMS = [
  //un ejemplo cargado a mano de la venta
  //deprecated
  {
    key: 0,
    name: "Cerco eléctrico",
    category: "Cercos",
    price: 40000,
  },
  {
    key: 1,
    name: "Cámara de seguridad",
    category: "Camaras",
    price: 20000,
  },
  {
    key: 2,
    name: "Cerco con puas",
    category: "Cercos",
    price: 30000,
  },
  {
    key: 3,
    name: "Kit seguridad",
    category: "Kits",
    price: 150000,
  },
  {
    key: 4,
    name: "Alarma de incendio",
    category: "Alarmas",
    price: 25000,
  },
];

var CATEGORIES = [
  {
    key: 1,
    name: "Kits",
  },
  {
    key: 2,
    name: "Camaras",
  },
  {
    key: 3,
    name: "Cercos",
  },
  {
    key: 4,
    name: "Alarmas",
  },
];

function fetchCategories() {
  const fetchedCategories = CATEGORIES;
  const defaultCategory = [DEFAULT_CATEGORY];
  const categories = defaultCategory.concat(fetchedCategories);
  return categories;
}

function fetchItems(keywords, category) {
  const fetchedItems = ITEMS;
  let filteredItems = [];

  fetchedItems.forEach((item) => {
    if (category === DEFAULT_CATEGORY.name || item.category === category) {
      let found = false;
      keywords.forEach((keyword) => {
        if (item.name.search(keyword) > -1) {
          found = true;
        }
      });
      if (found) {
        filteredItems.push(item);
      }
    }
  });

  return filteredItems;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      category: "",
      categories: [],
      items: [],
      cartItems: [],
      checkout: false,
      formprod: {
        id: "",
        codigo: "",
        descripcion: "",
        precio: "",
        categoria: "",
        marca: "",
      },
      form: {
        id: "",
        nombre: "",
        apellido: "",
        dni: "",
        tarjetas: "",
      },
      resultprod: "",
      resultado: "",
      clientes: [],
      productos: [],
    };

    fetch("http://localhost:1234/clientes")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          resultado: json.result,
          clientes: json.clientes,
        });
      });

    fetch("http://localhost:1234/productos")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          resultprod: json.result,
          productos: json.productos,
        });
      });
    this.addCartItem = this.addCartItem.bind(this);
    this.changeCartItemQuantity = this.changeCartItemQuantity.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onSearchBarChange = this.onSearchBarChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.removeCartItem = this.removeCartItem.bind(this);
    this.toggleCheckout = this.toggleCheckout.bind(this);
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

  componentDidMount() {
    const items = fetchItems([""], DEFAULT_CATEGORY.name);
    const categories = fetchCategories();
    const category = DEFAULT_CATEGORY.name;
    this.setState({ category, categories, items });
  }

  addCartItem(item) {
    let cartItems = this.state.cartItems;
    const index = cartItems.findIndex((x) => x.item.id === item.id);

    if (index < 0) {
      const newCartItem = { item: item, quantity: 1 };
      cartItems.push(newCartItem);
    } else {
      cartItems[index].quantity++;
    }

    this.setState({ cartItems });
  }

  changeCartItemQuantity(id, quantity) {
    let cartItems = this.state.cartItems;
    const index = cartItems.findIndex((x) => x.item.id === id);

    if (index > -1) {
      cartItems[index].quantity = quantity;
      this.setState({ cartItems });
    }
  }

  onCategoryChange(category) {
    this.setState({ category });
  }

  onSearchBarChange(filterText) {
    this.setState({ filterText });
  }

  onSearch(keywords, category) {
    const items = fetchItems(keywords, category);
    this.setState({ items });
  }

  removeCartItem(id) {
    let cartItems = this.state.cartItems;
    const index = cartItems.findIndex((x) => x.item.id === id);

    if (index > -1) {
      cartItems.splice(index, 1);
      this.setState({ cartItems });
    }
  }

  toggleCheckout() {
    this.setState((prevState) => ({
      checkout: !prevState.checkout,
    }));
  }

  render() {
    if (!this.state.checkout) {
      return (
        <div>
          {/* <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre </th>
                <th>Apellido </th>
                <th>Tajetas </th>
              </tr>
            </thead>
            <tbody>
              {this.state.clientes.map((item, index) => (
                <tr>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.tajetas && item.tajetas[0]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
 */}
          {/* <div class="item carousel-item active">
            <div class="row">
              <div class="col">
                <h2>
                  Venta <b>Online</b>
                </h2>
                <div
                  id="myCarousel"
                  class="carousel slide"
                  data-ride="carousel"
                  data-interval="0"
                >
                  <ol class="carousel-indicators">
                    <li
                      data-target="#myCarousel"
                      data-slide-to="0"
                      class="active"
                    ></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                  </ol>

                  <div class="carousel-inner">
                    <div class="item carousel-item active">
                      <div class="row">
                        <button type="button" class="btn btn-outline-secondary">
                          <ShoppingCart
                            cartItems={this.state.cartItems}
                            toggleCheckout={this.toggleCheckout}
                          />
                        </button>
                        <div class="container py-5">
                          <div class="row">
                            <ItemsTable
                              items={this.state.productos}
                              addCartItem={this.addCartItem}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>*/}

          <BrowserRouter>
            <div
              style={{
                display: "flex",
                background: "#1c1c1c8c",
                padding: "5px 0 5px 5px",
                fontSize: "20px",
              }}
            >
              <div style={{ margin: "10px" }}>
                <NavLink
                  to="/productos"
                  style={({ isActive }) => ({
                    color: isActive ? "#3a3f78" : "white",
                  })}
                >
                  Productos
                </NavLink>
              </div>
              <div style={{ margin: "10px" }}>
                <NavLink
                  to="/tarjetas"
                  style={({ isActive }) => ({
                    color: isActive ? "#3a3f78" : "white",
                  })}
                >
                  Tarjetas
                </NavLink>
              </div>
              <div style={{ margin: "10px" }}>
                <NavLink
                  to="/promociones"
                  style={({ isActive }) => ({
                    color: isActive ? "#3a3f78" : "white",
                  })}
                >
                  Descuentos
                </NavLink>
              </div>
            </div>
            <Routes>
              <Route exact path="/productos" element={<Productos />} />
              <Route exact path="/promociones" element={<Promociones />} />
              <Route exact path="/tarjetas" element={<Tarjetas />} />
            </Routes>
          </BrowserRouter>
        </div>
      );
    } else {
      return (
        <div>
          <ShoppingList
            cartItems={this.state.cartItems}
            changeCartItemQuantity={this.changeCartItemQuantity}
            removeCartItem={this.removeCartItem}
            toggleCheckout={this.toggleCheckout}
          />
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
