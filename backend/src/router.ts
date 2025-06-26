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

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.sendStatus(400);
      return;
    }

    const hashedPassword = badHash(password);
    const query = `SELECT * FROM "User" WHERE username = '${username}' AND password = '${hashedPassword}'`
    const resultado = await pool.query(query);

    if (resultado.rows.length > 0) {
      const token = (Math.random() * 100000).toFixed().toString(); // Placeholder
      res.json({ token });
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(500);
  }
});

export default router;
