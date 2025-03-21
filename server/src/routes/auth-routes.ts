import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  try{
    const {username, password}= req.body;

  if (!username || !password){
    return res.status(400).json({error:'Username and password are required'})
  }
  
    // Find user 
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
  }
  
    // Validate password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET_KEY || 'your_secret_key', { expiresIn: "1h" });
    return res.status(200).json({token})
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
