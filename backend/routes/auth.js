const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_Secret = 'deep&789.123(khawas)';
const fetchUser = require('../middleware/fetchUser');

//ROUTE 1 : Create user using post /api/auth/createuser
router.post(
  '/createuser',
  [
    //validations of email, name, password
    body('name', 'Enter a valid name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cant be blank').isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success = false;
    //If error return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //check if use with email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //if exsist then
        console.log('Found', user.name + ' ' + user.email);
        return res.status(400).json({ error: 'User already exist!!!' });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);

      //otherwise
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, jwt_Secret);
      success = true;
      res.json({ success,  authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
);

//Route 2 : Authenticate User post /api/auth/login :no login required
router.post(
  '/login',
  [
    //validations of email, name, password
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cant be blank').exists(),
  ],
  async (req, res) => {
    //If error return bad request
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Entered wrong credentials!!!' });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: 'Entered wrong credentials!!!' });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(payload, jwt_Secret);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
);

//ROUTE 3 : Get logged in User details /api/auth/getuser. Login Required
router.get('/getuser', fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password').select('-__v');
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
