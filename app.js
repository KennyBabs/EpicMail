import express from 'express';
import router from './routes/index';

const app = express();

app.use(router);




const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
});

export default app;