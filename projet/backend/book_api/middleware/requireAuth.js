import axios from "axios";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const response = await axios.post(
      "http://localhost:5000/client/validate-token",
      { token }
    );
    if (response.data.valid) {
      req.client = response.data.user;
      req.token = token;
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default requireAuth;


// import jwt from 'jsonwebtoken';

// export function authMiddleware(req, res, next) {
//   const token = req.header('Authorization').replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// }

// export function adminMiddleware(req, res, next) {
//   if (req.user.username !== 'admin') {
//     return res.status(403).json({ message: 'Access denied. Admins only.' });
//   }
//   next();
// }

