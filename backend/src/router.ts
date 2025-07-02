import { Router, Request, Response } from 'express';
import fs from 'fs';
import pool from './db';
import { md5 } from 'js-md5';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/libro', (req, res) => {
  const libro = req.query.libro;
  const contenido = fs.readFileSync(`assets/${libro}`)
  res.send(contenido);
});

function hashFromPass(password: string, salt: string): string {
  const mid = Math.floor(password.length / 2);
  const mixed =
    salt.slice(0, 4) +
    password.slice(0, mid) +
    salt.slice(4, 8) +
    password.slice(mid) +
    salt.slice(8);
  return md5(mixed);
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

    const query = `SELECT isPremium, hash, salt FROM "User" WHERE username = '${username}'`;

    const resultado = await pool.query(query);

    if (resultado.rows.length > 0) {
      const { ispremium, hash, salt } = resultado.rows[0];
      console.log(password, salt)
      const hashedPassword = hashFromPass(password, salt);
      if (hashedPassword === hash) {
        const token = (Math.random() * 100000).toFixed().toString();
        res.json({ token, isPremium: ispremium });
        return;
      } else {
        res.sendStatus(401);
        return;
      }
    } else {
      res.sendStatus(401);
      return;
    }
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

export default router;
