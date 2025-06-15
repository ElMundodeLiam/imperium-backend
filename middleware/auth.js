import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido.' });
  }
};

export default authMiddleware;
