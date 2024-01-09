const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secretKey } = require('../../config')

const saltRounds = 10;

class InvalidCredentialsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidCredentialsError';
  }
}

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secretKey, options);

};

const signupService = {
  preProcess: async (req, res) => {
    const { username, email, password } = req.body;
    return { username, email, password };
  },
  process: async (data) => {
    const { username, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user = await User.create({ username, email, passwordHash: hashedPassword });
    user.token = generateToken(user);
    await user.save();

    return { user };
  },
  postProcess: async (result, res) => {
    const { user } = result;
    res.status(201).json({ user: { username: user.username, email: user.email, token: user.token } });
  },
};

const loginService = {
  preProcess: async (req, res) => {
    const { email, password } = req.body;
    return { email, password };
  },
  process: async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new InvalidCredentialsError('Invalid credentials');
    }
    user.token = generateToken(user);
    await user.save();

    return { user };
  },
  postProcess: async (result, res) => {
    const { user } = result;
    res.json({ user: { username: user.username, email: user.email, token: user.token } });
  },
};

module.exports = {
  signupService,
  loginService,
  InvalidCredentialsError,
};
