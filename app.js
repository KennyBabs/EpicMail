import 'dotenv/config';
import express from 'express';
import router from './routes/index';
import route from './src/routes/userRoutes';
import group from './src/routes/groupRoutes';
import message from './src/routes/messageRouter';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
const app = express();
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);
app.use('/api/v2', route);
app.use('/api/v2', message);
app.use('/api/v2', group);


app.get('/', (req, res) => res.status(200).send({ 
	message: 'WELCOME' 
}));

app.get('*', (req, res) => {
	res.status(404).send({
	  status: 404,
	  error: 'This url does not exist',
	});
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}...`);
});

export default app;