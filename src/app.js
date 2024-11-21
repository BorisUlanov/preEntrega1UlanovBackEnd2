import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import connectDB from './config/mongoDB.config.js';
import cartRoutes from './routes/carts.routes.js'
import productRoutes from './routes/products.routes.js';
import mainRouter from './routes/index.js';
import { Server } from 'socket.io';
import http from 'http';
import './config/passport.config.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use('/carts', cartRoutes);
app.use('/products', productRoutes);

app.set('view engine', 'ejs');
app.set('views', './src/views');

// Rutas
app.use('/api', mainRouter);

export default app;

// Crear servidor HTTP y asociar socket.io
const server = http.createServer(app);
const io = new Server(server);

// Middleware de WebSockets
io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
  
    socket.on('disconnect', () => {
      console.log(`Usuario desconectado: ${socket.id}`);
    });

      // Manejar eventos personalizados, como notificaciones de carritos
  socket.on('updateCart', (data) => {
    console.log('Actualización del carrito:', data);
    io.emit('cartUpdated', data); // Notificar a todos los clientes
  });
});

// Iniciar el servidor en el puerto 8080
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});