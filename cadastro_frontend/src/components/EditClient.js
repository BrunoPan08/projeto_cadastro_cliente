import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const EditClient = ({ client }) => {
  const [showModal, setShowModal] = useState(false);
  const [clientName, setClientName] = useState(client.client_name);
  const [clientEmail, setClientEmail] = useState(client.client_email);
  const [clientTelefone, setClientTelefone] = useState(client.client_telefone);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const updateClient = async () => {
    try {
      const body = { client_name: clientName, client_email: clientEmail, client_telefone: clientTelefone };
      const response = await fetch(`http://localhost:5000/client/${client.client_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error("Falha ao atualizar cliente");
      }
      handleClose();
      window.location.reload(); // Recarrega a página após a atualização
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
          <input
            type="text"
            className="form-control"
            value={clientTelefone}
            onChange={(e) => setClientTelefone(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={updateClient}>
            Editar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditClient;
