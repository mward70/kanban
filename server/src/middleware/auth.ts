import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global{
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader= req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // extracts token
    const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Forbidden! Invalid token." });
      }
  
      req.user = decoded as JwtPayload;
      return next();
    });
  } else {
    return res.status(401).json({ error: "Unauthorized!" });
  }
    return;
};
export default authenticateToken;