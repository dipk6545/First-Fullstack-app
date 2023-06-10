const jwt = require('jsonwebtoken');
const jwt_Secret = 'deep&789.123(khawas)';

const fetchuser = (req, res, next) => {
  //Get user from jwt token and add id to red object
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: 'Please authenticate using valid token' });
  }

  try {
    const data = jwt.verify(token, jwt_Secret);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate using valid token' });
  }
  const string = jwt.verify;
};

module.exports = fetchuser;
