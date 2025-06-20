import express from 'express';
import router from './router';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.use('', router);

app.listen(3000, () => {
    console.log(`Server running`);
});

export default app;