const ipfs = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { smartContract: userSignupContract } = require('../config/blockchain'); // Importing contract for signup
const { smartContract: userLoginContract } = require('../config/blockchain');  // Importing contract for login

// Traditional Signup
exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    username,
    password: hashedPassword,
    email,
  };

  try {
    const result = await ipfs.add(JSON.stringify(userData));
    res.status(201).json({ message: 'User created successfully', cid: result.path });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Wallet-Based Signup
exports.walletSignup = async (req, res) => {
  const { walletAddress, username } = req.body;

  try {
    const receipt = await userSignupContract.methods.signup(walletAddress, username).send({ from: walletAddress });
    res.status(201).json({ message: 'Wallet signup successful', transaction: receipt.transactionHash });
  } catch (error) {
    res.status(500).json({ message: 'Error in wallet signup', error });
  }
};

// Traditional Login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const files = await ipfs.cat(username);
    const userData = JSON.parse(files.toString());

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Wallet-Based Login
exports.walletLogin = async (req, res) => {
  const { walletAddress } = req.body;

  try {
    const receipt = await userLoginContract.methods.login(walletAddress).call();
    if (receipt.isValid) {
      const token = jwt.sign({ walletAddress }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: 'Wallet login successful', token });
    } else {
      res.status(401).json({ message: 'Invalid wallet credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error in wallet login', error });
  }
};
