import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const forceDatabaseRefresh = false;
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: ['https://kanban-36eq.onrender.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
