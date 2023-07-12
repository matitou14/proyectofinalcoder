import express from "express";
import path, { dirname } from "path";
import dotenv from 'dotenv'
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import sessionRoutes from "./routes/sessionRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import cartViews from './routes/cartViews.js'
import cartRoutes from "./routes/cartRoutes.js";
import session from 'express-session'
import MongoStore  from 'connect-mongo';
import { fileURLToPath } from 'url';
import passport from "passport";
import passportConfig from './config/passportConfig.js'

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express ();
const port = 8080;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbCluster = process.env.DB_CLUSTER;

const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}/${dbName}?retryWrites=true&w=majority`;

app.use(session({
    store: MongoStore.create({
        mongoUrl:dbURI,
        dbName:'ecommerce',
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl:90
    }),
    secret:'Alejo',
    resave: true, 
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));



app.use('/session',sessionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/carts', cartViews);
app.get('/', (req, res) => {
    res.render('index');
  });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));