import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  //If the user exists and the password is correct, return a JWT token
  try{
    const {username, password}= req.body;

  if (!username || !password){
    res.status(400).json({error:'Username and password are required'}); 
    return
  }
  
    // Find user 
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return
  }
  
    // Validate password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET || '', { expiresIn: "1h" });
    res.status(200).json({token})
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
    return
  }

};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
