import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
  userId: number;
  exp?: number;
  iat?: number;
}


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  //verify the token exists and add the user data to the request object
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Unauthorized!" });
    return
  }

  const token = authHeader.split(" ")[1]; // extracts token
  const SECRET_KEY = process.env.SECRET_KEY || '';

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "Forbidden! Invalid token." });
      return;
    }
    console.debug("Decoded token:", decoded);
    req.user = decoded as JwtPayload;
   next();
  });
};
export default authenticateToken;