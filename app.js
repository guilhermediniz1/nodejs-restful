const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());


const database = require('./bancoDeDados.js')

database.inicializar()

app.post("/clientes", (req, res) => {
	const { nome, email, telefone, endereco, data_nascimento } = req.body;
	const query = `INSERT INTO Cliente (nome, email, telefone, endereco, data_nascimento) VALUES (?, ?, ?, ?, ?)`;

	db.run(query, [nome, email, telefone, endereco, data_nascimento], function(err) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.status(201).json({ id: this.lastID });
		}
	});
});

app.get("/clientes", (req, res) => {
	const query = "SELECT * FROM Cliente";

	db.all(query, [], (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(rows);
		}
	});
});

app.get("/clientes/:id", (req, res) => {
	const { id } = req.params;
	const query = "SELECT * FROM Cliente WHERE id = ?";

	db.get(query, [id], (err, row) => {
		if (err) {
			res.status(500).json({ error: err.message });
		} else if (!row) {
			res.status(404).json({ error: "Cliente não encontrado" });
		} else {
			res.json(row);
		}
	});
});

app.put("/clientes/:id", (req, res) => {
	const { id } = req.params;
	const { nome, email, telefone, endereco, data_nascimento } = req.body;
	const query = `UPDATE Cliente SET nome = ?, email = ?, telefone = ?, endereco = ?, data_nascimento = ? WHERE id = ?`;

	db.run(query, [nome, email, telefone, endereco, data_nascimento, id], function(err) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else if (this.changes === 0) {
			res.status(404).json({ error: "Cliente não encontrado" });
		} else {
			res.json({ message: "Cliente atualizado com sucesso" });
		}
	});
});

app.delete("/clientes/:id", (req, res) => {
	const { id } = req.params;
	const query = "DELETE FROM Cliente WHERE id = ?";

	db.run(query, [id], function(err) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else if (this.changes === 0) {
			res.status(404).json({ error: "Cliente não encontrado" });
		} else {
			res.json({ message: "Cliente deletado com sucesso" });
		}
	});
});

app.listen(port, () => {
	console.log(`Servidor rodando em http://localhost:${port}`);
});
