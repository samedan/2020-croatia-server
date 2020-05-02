const User = require('../models/user');

exports.login = (req, res) => {
  return res.json({ message: 'Logging In' });
};

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
