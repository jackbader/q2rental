'use strict'

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, 'vgufvgjvg', (err, payload) => {
    let hasToken
    let newobj= {}
    if (err) {
      hasToken = false
      newobj['hasToken'] = hasToken
      return res.send(newobj);
    }
    hasToken = true
    newobj['hasToken'] = hasToken
    newobj['cookies'] = payload
    res.send(newobj);
  });
});

router.post('/token', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    res.send({error: 'Email must not be blank'})
  }

  if (!password || !password.trim()) {
    res.send({error: 'Password must not be blank'})
  }

  let user;

  knex('users')
    .where('email', email)
    .orWhere('username', email)
    .first()
    .then((row) => {
      if (!row) {
        return res.send({error: 'That email or username does not exist!'})
      }

      user = camelizeKeys(row);

      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(() => {
      const claim = { userId: user.id };
      const token = jwt.sign(claim, 'vgufvgjvg', {
        expiresIn: '7 days'  // Adds an exp field to the payload
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        secure: router.get('env') === 'production'  // Set from the NODE_ENV
      });

      delete user.hashedPassword;

      res.send(user);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      res.send({error: 'Bad password!'})
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/token', (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200)
  res.end({});
});



module.exports = router;
