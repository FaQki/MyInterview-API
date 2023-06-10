import express from 'express'
import config from './config'
import morgan from 'morgan'
import cors from 'cors'
import videoRoutes from './routes/videos.routes'
import userRoutes from './routes/user.routes'
import authRoute from './routes/auth.routes'
import {createRol} from './libs/initialSetup'

const app = express();
createRol();

app.set('port', config.PORT);
app.use(morgan('dev'));// manda info
app.use(cors()); //permite a cualquier servidor hacer peticiones
app.use(express.json());
app.use(express.urlencoded({extended: false}));//entender peticion post desde form
app.use(videoRoutes);
app.use(userRoutes);
app.use(authRoute);

export default app;

//toda la configuracion