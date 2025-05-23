const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';



const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

 
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email },
          { username: username },
        ],
      },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email or username already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      id: newUser.user_id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during signup.' });
  }
};




const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1d' });
   res.json({
  message: 'Login successful',
  token,
  userId: user.user_id,
  username: user.username, 
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
};

const logout = (req, res) => {
  res.json({ message: 'Logout handled on client side. Just delete the token.' });
};

module.exports = {
  signup,
  login,
  logout,
};
