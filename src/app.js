//Uso W3Scholls para ayudarme con los conceptos que no entiendo
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { engine } from 'express-handlebars';
import __dirname from './utils';
import dotenv from 'dotenv';

//Creo server
import { createServer } from 'http';

//Importo routers
import viewsRouter from './views/index.router.js'

//Importo constructor de socket
import {Server as SocketServer} from 'socket.io';

//Importo usuarios
import userRouter from './routes/users.router.js';

//Importo productos
import productRouter from './routes/product.router.js';

//Importo modelo de prodcutos
import Product from './models/product.model.js';

//Importo modelos de los usuarios 
import User from './models/user.model.js';

//Importo model de cart
import cartRouter from './routes/cart.router.js';

dotenv.config({ path: path.join(__dirname, '.env')});//En mi fuente se menciono puede haber problemas para leer el env, y la recomendacion era usar "{ path: path.join(__dirname, '.env') }" para crear una ruta absoulta y evitar esos problemas, Corrijame si no es recomendable (o)_(o)

const app = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer);
const uriConexion = process.env.URIMONGODB;

//mongoose.connect(uriConexion); Se recomendo agregarle gestion de errores
mongoose.connect(uriConexion, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('conectando a MongoDB'))
    .catch((error) => console.log('Error al conectar a MongoDB:', error));

//Lista
let productos = [];

//Configuro
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
}));

//Ruta absoluta
app.set('views', path.join(__dirname + '/views'));//Uso path.join por recomendacion

//Indicamos que motor de plantillas se usara
app.set('view engine','handlebars');

//Set public(carpeta estática)
app.use(express.static(path.join(__dirname, 'public')));

//Middlewares
app.use(express.urlencoded({extended: true }));
app.use(express.json());

//Uso router para las vistas
app.use('/',viewsRouter);

//Escuchar entrantes
io.on( 'connection', (socket) => {
    console.log("Nuevo cliente online");

    //Envio actuales al cliente
    socket.emit('products', productos);

    //Escucho si añade
    socket.on('new-product', (product) => {
        products.push(product);
        io.emit('products', productos);
    });

    //Escucho si borra
    socket.on('delete-product', (index) => {
        products.splice(index,1);
        io.emit('products', productos);
    });
    //Esto deberia mejorarlo, pero me quedo con lo que vimos(Tengo miedo de romper algo)
});

httpServer = app.listen(8080, () => {
    console.log("Listening en PORT 8080");
});