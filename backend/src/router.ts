import { Router } from 'express';
import fs from 'fs';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/terminos', (req, res) => {
    const producto = req.query.producto;
    const contenido = fs.readFileSync(`assets/${producto}`)
    res.send(contenido);
  });

export default router;