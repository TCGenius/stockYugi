const {pool} = require('./routers/pg.js')
const express = require('express');
const app = express();
const fs = require('fs');

const routerCartas = require('./routers/cartas.js');
const routerUbi = require('./routers/ubicaciones.js');



let ubicacion = [], cartas = []; //Inicializo los arrays que van a tomar valor luego.

//Routers
app.use('/api/cartas', routerCartas);
app.use('/api/ubicaciones', routerUbi);

const cargaUbi = async () => {
	const result = await pool.query('SELECT * FROM ubicaciones');
	ubicacion = result.rows;
};
const cargaCartas = async () => {
	const result = await pool.query('SELECT * FROM cartasEnStock');
	cartas = result.rows;
};

app.get('/', async (req, res) => {
		await cargaUbi();
		await cargaCartas();
		res.send('Datos cargados')
	}
	)

app.get('/ubicacion/:id', async (req, res) => {
	await consultaUbi();
	const id = req.params.id
	console.log(id);
	const indice = ubicacion.findIndex(result => result.idubi == id);
	if (indice.length === -1) {
			return res.status(404).send('Tasfla sheando')
	}
	res.send(ubicacion[indice]);
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`)
});