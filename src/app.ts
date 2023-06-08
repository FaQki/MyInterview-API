import express from 'express'
import config from './config'
import morgan from 'morgan'
import cors from 'cors'
import videoRoutes from './routes/videos.routes'

const app = express();

app.set('port', config.PORT);
app.use(morgan('dev'));// manda info
app.use(cors()); //permite a cualquier servidor hacer peticiones
app.use(express.json());
app.use(express.urlencoded({extended: false}));//entender peticion post desde form
app.use(videoRoutes);

export default app;

//toda la configuracion