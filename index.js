const { Pool } = require('pg');
const http = require('http');
const express = require('express');
const app = express();
//const pgConfig = require('./config/config.js')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Aconcagua4826',
    database: 'stockYugi'
  });
let ubicacion = [];
const consultaUbi = async () => {
        const res = await pool.query('SELECT * FROM ubicaciones');
        ubicacion = res.rows;
};
app.get('/', (req, res) => {
    res.send('<h1>Algo</h1>');
})

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

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
});