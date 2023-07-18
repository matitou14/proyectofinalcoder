export const ensureAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Acceso denegado. Debe ser administrador para realizar esta acción.' });
    }
  };
  
  export const ensureUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
      next();
    } else {
      res.status(403).json({ error: 'Acceso denegado. Debe ser usuario para realizar esta acción.' });
    }
  };