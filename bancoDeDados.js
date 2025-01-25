const path = require("path");
const dbPath = path.resolve(__dirname, "database.sqlite");
const sqlite3 = require("sqlite3").verbose();

const inicializar = () => {
	const db = new sqlite3.Database(dbPath, (err) => {
		if (err) {
			console.error("Erro ao conectar ao banco de dados:", err.message);
		} else {
			console.log(`Banco de dados conectado: ${dbPath}`);
		}
	});

	db.serialize(() => {
		db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name='Cliente'`, (err, row) => {
			if (err) {
				console.error("Erro ao verificar tabela:", err.message);
			} else if (!row) {
				// Tabela não existe, criá-la
				db.run(`CREATE TABLE Cliente (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT NOT NULL,
                telefone TEXT NOT NULL,
                endereco TEXT NOT NULL,
                data_nascimento TEXT NOT NULL
            )`, (err) => {
					if (err) {
						console.error("Erro ao criar tabela:", err.message);
					} else {
						console.log("Tabela Cliente criada com sucesso.");
					}
				});
			} else {
				console.log("Tabela Cliente já existe.");
			}
		});
	});
}

module.exports = { inicializar }
