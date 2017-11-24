const jwt = require('jsonwebtoken');
const _ = require('lodash');
const argon2 = require('argon2');
const User = require('mongoose').model('User');

const createTokens = async (user, secret, secret2) => {
  const createToken = jwt.sign(
    {
      user: _.pick(user, ['id', 'email']),
    },
    secret,
    {
      expiresIn: '5m',
    },
  );

  const createRefreshToken = jwt.sign(
    {
      user: _.pick(user, 'id'),
    },
    secret2,
    {
      expiresIn: '7d',
    },
  );

  return [createToken, createRefreshToken];
};

exports.createTokens = createTokens;

exports.refreshTokens = async (token, refreshToken, SECRET, SECRET2) => {
  let userId = 0;
  try {
    const { user: { id } } = jwt.decode(refreshToken);
    userId = id;
  } catch (err) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return {};
  }

  const refreshSecret = user.password + SECRET2;

  try {
    jwt.verify(refreshToken, refreshSecret);
  } catch (err) {
    return {};
  }

  const [newToken, newRefreshToken] = await createTokens(
    user,
    SECRET,
    refreshSecret,
  );
  return {
    token: newToken,
    refreshToken: newRefreshToken,
    user,
  };
};

exports.tryLogin = async (email, password, SECRET, SECRET2) => {
  const user = await User.findOne({ email });
  if (!user) {
    // user with provided email not found
    return {
      ok: false,
      errors: [{ path: 'email', message: 'Wrong email' }],
    };
  }

  const valid = await argon2.verify(user.password, password);
  if (!valid) {
    // bad password
    return {
      ok: false,
      errors: [{ path: 'password', message: 'Wrong password' }],
    };
  }

  const refreshTokenSecret = user.password + SECRET2;

  const [token, refreshToken] = await createTokens(
    user,
    SECRET,
    refreshTokenSecret,
  );

  return {
    ok: true,
    token,
    refreshToken,
  };
};
