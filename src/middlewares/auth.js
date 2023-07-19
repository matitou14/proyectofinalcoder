export const ensureAdminOrPremium = (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(403).json({ error: 'User not logged in' });
  } else if (user.role !== 'admin' && user.role !== 'premium') {
    return res.status(403).json({ error: 'User not authorized' });
  }
  next();
};
  
export const ensureUser = (req, res, next) => {
  console.log('Session:', req.session);  // Imprimirá toda la información de la sesión
  console.log('User:', req.session.user);  // Imprimirá solo la información del usuario

  if (req.session && req.session.user && req.session.user.role === "user") {
    next();
  } else {
    res.status(403).json({ error: 'Acceso denegado. Debe ser usuario para realizar esta acción.' });
  }
};