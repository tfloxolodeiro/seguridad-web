import { Router, Request, Response } from 'express';
import fs from 'fs';
import pool from './db';
import crypto from 'crypto';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/libro', (req, res) => {
  const libro = req.query.libro;
  const contenido = fs.readFileSync(`assets/${libro}`)
  res.send(contenido);
});

function badHash(password: string): string {
  const salt = '123'; 
  const md5Hash = crypto.createHash('md5').update(password).digest('hex');
  return md5Hash + salt;
}

router.post('/register', async (req, res) => {
  try {
    const { username, hash, salt } = req.body;

    const query = `INSERT INTO "User" (username, hash, salt) VALUES ('${username}', '${hash}', '${salt}')`;
    await pool.query(query);

    const token = (Math.random() * 100000).toFixed().toString();
    res.json({ token, isPremium: false });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});


function tieneMalasPalabras(palabra: string): boolean {
  const malasPalabras = ["insert", "update", "delete"];
  return malasPalabras.some(palabra => palabra.toLowerCase().includes(palabra)) && palabra.includes("'");
}


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.sendStatus(400);
      return;
    }

    if (tieneMalasPalabras(username) || tieneMalasPalabras(password)) {
      res.sendStatus(500);
      return;
    }

    //TODO: Implementar deshasheo por aca
    const hashedPassword = badHash(password);
    //TODO: Cambiar esta query porque ya no tiene "password"
    const query = `SELECT isPremium FROM "User" WHERE username = '${username}' AND password = '${hashedPassword}'`;
    const resultado = await pool.query(query);

    if (resultado.rows.length > 0) {
      const token = (Math.random() * 100000).toFixed().toString();
      const isPremium = resultado.rows[0].ispremium;
      res.json({ token, isPremium });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

export default router;
