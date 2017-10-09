const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');


const router = express.Router();

router.get('/users', (req, res, next) => {

    knex('users')
      .select()
      .then((data) => {
        res.send(data)
      })

})

router.get('/users/:id', (req, res, next) => {

  const id = req.params.id

  knex('users')
    .select()
    .where('id', id)
    .then((row) => {
      res.send(row)
    })

})

router.post('/users', (req, res, next) => {

  const {first_name, last_name, email, username, password} = req.body


  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(
      400,
      'Password must be at least 8 characters long'
    ));
  }

  if (!username || username.length < 8) {
    return next(boom.create(
      400,
      'username must be at least 8 characters long'
    ));
  }

  knex('users')
    .where('email', email)
    .first()
    .then((user) => {
      if (user) {
        throw boom.create(400, 'Email already exists');
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashed_password) => {
      const insertUser = { first_name, last_name, email, username, hashed_password };

      return knex('users').insert(insertUser, '*');
    })
    .then((rows) => {
      const user = camelizeKeys(rows[0]);
      const claim = { userId: user.id };
      const token = jwt.sign(claim, process.env.JWT_KEY, {
        expiresIn: '7 days'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
        secure: router.get('env') === 'production'
      });

      delete user.hashed_password;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });

})
