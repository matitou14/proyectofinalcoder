import express from 'express';
import * as userController from '../controllers/userControllers.js';
import UserModel from '../models/userModel.js';

const router = express.Router();

// Vista para crear usuarios
router.get('/register',(req, res) => {
    res.render('sessions/register')
} )


//API para crear usuarios
router.post('/register', async (req, res) => {
    const userNew = req.body
    const user = new UserModel(userNew)
    await user.save()
   
    res.redirect('/session/login')
});

//Vista de login
router.get('/login',(req,res) =>{(
    res.render('sessions/login')
)}),


// API de login

router.post('/login', async (req,res) =>{
    const {email, password} = req.body
    const user = await UserModel.findOne ({email,password}).lean().exec()
    if (!user) {
        return res.status(401).render('errors/db', {
            error:'Error en el email y/o contraseña'
        })
    }

    req.session.user = user
    res.redirect('/api/products')
})

//CERRAR LA SESION

router.post('/logout', (req, res) =>{
    req.session.destroy(err =>{
        if(err) {
            console.log(err)
            res.status(500).render('errors/db',{
                error: err
            })
        }else {
            res.redirect('/session/login')
        }
    })
})

export default router;