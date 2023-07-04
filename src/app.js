import express from "express";
import path, { dirname } from "path";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express ();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users',userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.get('/', (req, res) => {
    res.render('index');
  });

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
