import express from "express";
import path from "path"
import Handlebars from "handlebars";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productsRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"



const app = express ()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/api/users',userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes)
app.get('/', (req, res) => {
    res.render('index')
  });

