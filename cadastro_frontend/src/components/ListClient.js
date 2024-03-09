import React, { Fragment ,useEffect, useState, UseState} from "react";
import EditClient from "./EditClient";

const ListClient = () => {

  const [client, setClient] = useState([]);

  const deleteClient = async (id) => {
    try {
      const deleteClient = await fetch(`http://localhost:5000/client/${id}`, {
        method: "DELETE"
      });
      setClient(client.filter(client =>client.client_id !== id))
    } catch(err) {
      console.error(err.message)
    }
  }

  const getClient = async() => {
    try {
      const response = await fetch("http://localhost:5000/client");
      const jsonData = await response.json()
      setClient(jsonData)
    } catch(err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getClient();
  }, [])

  return (
    <Fragment>
      <table class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {client.map(client => (
            <tr key={client.client_id}>
              <th>{client.client_name}</th>
              <th>{client.client_telefone}</th>
              <th>{client.client_email}</th>
              <th><EditClient client={client} /></th>
              <th><button className="btn btn-danger" onClick={() => deleteClient(client.client_id)}>deletar</button></th>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  )
}

export default ListClient;