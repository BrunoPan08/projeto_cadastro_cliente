const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/client", async (req, res) => {
  try {
    const { client_name, client_email, client_telefone } = req.body;
    const newClient = await pool.query("INSERT INTO client_data (client_name, client_email, client_telefone) VALUES ($1, $2, $3) RETURNING *", [client_name, client_email, client_telefone]);
    res.json(newClient.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao inserir cliente" });
  }
});

app.get("/client", async (req, res) => {
  try {
    const allClient = await pool.query("SELECT * FROM client_data");
    res.json(allClient.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = await pool.query("SELECT * FROM client_data WHERE client_id = $1", [id]);
    res.json(clientId.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
})

app.put("/client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { client_name, client_email, client_telefone } = req.body;

    const updateClient = await pool.query(
      "UPDATE client_data SET client_name = $1, client_email = $2, client_telefone = $3 WHERE client_id = $4 RETURNING *",
      [client_name, client_email, client_telefone, id]
    );

    res.json("client was changed!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erro ao atualizar cliente" });
  }
});

app.delete("/client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteClient = await pool.query("DELETE FROM client_data WHERE client_id = $1", [id]);
    res.json("Client was deleted")
  } catch {
    console.error(err.message);
  }
})

app.listen(5000, () => console.log("Server up in 5000"));