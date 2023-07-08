import express from 'express';
import * as userService from '../services/userServices.js'

const router = express.Router();

router.post('/session/register', async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await userService.registerUser(username, password);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

  export const showLoginForm = (req, res) => {
    res.render('login'); // Renderizar la vista de inicio de sesión
  };
  
  export const loginUser = (req, res) => {
    const { email, password } = req.body;
  
    // Validar los datos del usuario y realizar la lógica de inicio de sesión
    // Aquí puedes utilizar tu servicio de autenticación y sesión
    if (email === 'usuario@example.com' && password === 'contraseña') {
      req.session.user = { email }; // Establecer los datos del usuario en la sesión
      res.redirect('/dashboard'); // Redireccionar al dashboard o a otra página protegida
    } else {
      res.render('login', { error: 'Credenciales inválidas' });
    }
  };
  
  export const logoutUser = (req, res) => {
    req.session.destroy(); // Destruir la sesión
    res.redirect('/'); // Redireccionar a la página de inicio u otra página pública
  };
  export default router;
  