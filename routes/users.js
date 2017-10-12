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

router.patch('/users/:id', (req, res, next) => {
  const {profile_img} = req.body

  const id = req.params.id

  knex('users')
    .where('id', id)
    .first()
    .then((user) => {
      let newobj = {
        profile_img: profile_img,
      }
      return knex('users')
        .update(newobj, '*')
        .where('id', id);
    })
    .then((rows) => {
        const user = rows[0];
        res.send(user);
    })
    .catch((err) => {
      next(err);
    })
})

router.post('/users', (req, res, next) => {

  const {first_name, last_name, email, username, password} = req.body
  console.log(username)


  if (!email || !email.trim()) {
    res.send({error: 'Email must not be blank'})
  }

  if (!password || password.length < 8) {
    res.send({error: 'Password must be at least 8 characters long'})

  }

  if (!username || username.length < 8) {
    res.send({error: 'Username must be at least 8 characters long'})
  }

  knex('users')
    .where('email', email)
    .orWhere('username', username)
    .first()
    .then((user) => {
      if (user) {

        res.send({error: 'Email or username is already taken!'})
        //throw boom.create(400, 'Email already exists', "test");
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
      const token = jwt.sign(claim, 'kjlsdhfkljsdhfs', {
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

module.exports = router;
