const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!password || !email) {
    return res.status(422).send({
      errors: [
        {
          title: 'Missing data',
          detail: 'Email or Password missing',
        },
      ],
    });
  }

  User.findOne({ email }, (error, foundUser) => {
    if (error) {
      return res.status(422).send({
        errors: [
          {
            title: 'DBB error',
            detail: 'Weird findOne error',
          },
        ],
      });
    }
    if (!foundUser) {
      return res.status(422).send({
        errors: [
          {
            title: 'Invalid credentials',
            detail: `User with this email or password doesn't exist`,
          },
        ],
      });
    }
    if (foundUser.hasSamePassword(password)) {
      // Generate JWT TOKEN
      const token = jwt.sign(
        {
          sub: foundUser.id,
          username: foundUser.username,
        },
        config.JWT_SECRET,
        { expiresIn: '2h' }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [
          {
            title: 'Invalid credentials',
            detail: `User with this email or password doesn't exist`,
          },
        ],
      });
    }
  });
};

// REGISTER
exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!password || !email || !username) {
    return res.status(422).send({
      errors: [
        {
          title: 'Missing data',
          detail: 'Username, Email or Password missing',
        },
      ],
    });
  }
  if (username && username.length < 4) {
    console.log(username.length);
    return res.status(422).send({
      errors: [
        {
          title: 'Username error',
          detail: 'Username should be at least 4 characters long',
        },
      ],
    });
  }
  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: 'Invalid password',
          detail: 'Password is not matching Confirmation Password',
        },
      ],
    });
  }
  User.findOne({ email }, (error, existingUser) => {
    if (error) {
      return res.status(422).send({
        errors: [
          {
            title: 'DBB error',
            detail: 'Weird findOne error',
          },
        ],
      });
    }
    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: 'Invalid email',
            detail: 'User with provided email already exist',
          },
        ],
      });
    }
    const user = new User({ username, email, password });
    user.save((error) => {
      console.log(user);
      if (error) {
        console.log(error);
        return res.status(422).send({
          errors: [{ title: 'DBB error', detail: 'Something went wrong' }],
        });
      }
      return res.json({ status: 'Registered User' });
    });
  });
};

// exp
exports.onlyAuthUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decodedToken = parseToken(token);
    if (!decodedToken) {
      return notAuthorized(res);
    }

    User.findById(decodedToken.sub, (error, foundUser) => {
      if (error) {
        console.log(error);
        return res.status(422).send({
          errors: [{ title: 'DBB error', detail: 'Something went wrong' }],
        });
      }
      if (foundUser) {
        res.locals.user = foundUser;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  } else {
    return notAuthorized(res);
  }
};

function parseToken(token) {
  return jwt.verify(token.split(' ')[1], config.JWT_SECRET) || null;
}

function notAuthorized(res) {
  return res.status(401).send({
    errors: [
      {
        title: 'Not authorized',
        detail: 'You need to log in to get access',
      },
    ],
  });
}
