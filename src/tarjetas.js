import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";
import "./card.css";

class Tarjetas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        id: "",
        banco: "",
        descripcion: "",
        saldo: "",
      },

      resultado: "",
      tarjetas: [],
    };

    fetch("http://localhost:1234/clientes/tarjetas/1004")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({
          resultado: json.result,
          tarjetas: json.tarjetas,
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
              <th>Descripcion </th>
              <th>Banco </th>
              <th>Saldo </th>
            </tr>
          </thead>
          <tbody>
            {this.state.tarjetas.map((item, index) => (
              <tr>
                <td>{item.descripcion}</td>
                <td>{item.banco}</td>
                <td>{item.saldo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default Tarjetas;
