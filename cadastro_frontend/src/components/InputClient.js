import React, { Fragment, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

const InputClient = () => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientTelefone, setClientTelefone] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { client_name: clientName, client_email: clientEmail, client_telefone: clientTelefone };
      const response = await fetch("http://localhost:5000/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Fragment>
      <h1 className="text-center">Input Client</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input type="text" className="form-control mr-2" placeholder="Nome" value={clientName} onChange={e => setClientName(e.target.value)} />
        <input type="email" className="form-control mr-2" placeholder="Email" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
        <input type="text" className="form-control mr-2" placeholder="Telefone" value={clientTelefone} onChange={e => setClientTelefone(e.target.value)} />
        <button className="btn btn-success">Adicionar</button>
      </form>
    </Fragment>
  )
}

export default InputClient;
