import express from 'express';

const app = express();




const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
});