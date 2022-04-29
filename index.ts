import Server from './models/server';
import dotenv from 'dotenv';

// configurar variables de entorno
dotenv.config();

// inicializar servidor
const server = new Server();
server.listen();
