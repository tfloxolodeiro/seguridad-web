import { Router, Request, Response } from 'express';
import fs from 'fs';
import pool from './db';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/libro', (req, res) => {
  const libro = req.query.libro;
  const contenido = fs.readFileSync(`assets/${libro}`)
  res.send(contenido);
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.sendStatus(400);
      return
    }

    const query = `SELECT * FROM "User" WHERE username = '${username}' AND password = '${password}'`
    const resultado = await pool.query(query)

    if (resultado.rows.length > 0) {
      const token = (Math.random() * 100000).toFixed().toString() //Placeholder, solo para que devuelva algo
      res.json({ token })
    } else {
      res.sendStatus(401)
    }
  } catch (e) {
    res.sendStatus(500)
  }

});

export default router;