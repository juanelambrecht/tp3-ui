import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";

class Promociones extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        descuento: "",
        tarjeta: "",
      },
      resultado: "",
      descuentos: [],
    };

    fetch("http://localhost:1234/descuentos")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          resultado: json.result,
          descuentos: json.descuentos,
        });
      });

    //     this.setState((state) => ({
    //       form: {
    //         ...state.form,
    //         [nombre]: valor,
    //       },
    //     }));
  }

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Descuento </th>
              <th>Banco/Tarjeta </th>
              <th>Marca </th>
            </tr>
          </thead>
          <tbody>
            {this.state.descuentos.map((item, index) => (
              <tr>
                <td>{item.descuento}</td>
                <td>{item.tarjeta}</td>
                <td>{item.marca}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Promociones;
