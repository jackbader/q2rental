const express = require('express');
const knex = require('../knex');

const router = express.Router();


router.get('/items', (req, res, next) => {

  knex('items')
    .select()
    .then((data) => {
      res.send(data)
    })

})

router.get('/items/:id', (req, res, next) => {
  const id = req.params.id

  //TODO:
  //HANDLE -1 / 0 / Non existant item id

  knex('items')
    .select()
    .where('id', id)
    .then((row) => {
      res.send(row)
    })

})

router.post('/items', (req, res, next) => {
  const {title, desc, img_url, cat, owner_id, rented, daily_price} = req.body

  knex('items')
    .insert({
      title: title,
      desc: desc,
      img_url: img_url,
      cat: cat,
      owner_id: owner_id,
      rented: rented,
      daily_price: daily_price
    }, '*')
    .then((item) => {
      let newitem = {
        id: item[0].id,
        title: item[0].title,
        desc: item[0].desc,
        img_url: item[0].img_url,
        cat: item[0].cat,
        owner_id: item[0].owner_id,
        rented: item[0].rented,
        daily_price: item[0].daily_price
      }
      res.send(newitem)
    })
    .catch((err) => {
      next(err);
    })
})

router.delete('/items/:id', (req, res, next) => {

  const id = req.params.id

  let item
  knex('items')
    .where('id', id)
    .first()
    .then((row) => {
      item = row
      return knex('items')
        .del()
        .where('id', id)
    })
    .then(() => {
      res.send(item)
    })

})


router.patch('/items/:id', (req, res, next) => {

  const {title, desc, img_url, cat, owner_id, rented, daily_price} = req.body

  const id = req.params.id

  knex('items')
    .where('id', id)
    .first()
    .then((item) => {
      let newobj = {
        title: title,
        desc: desc,
        img_url: img_url,
        cat: cat,
        owner_id: owner_id,
        rented: rented,
        daily_price: daily_price
      }
      return knex('items')
        .update(newobj, '*')
        .where('id', id);
    })
    .then((rows) => {
        const item = rows[0];
        res.send(item);
    })
    .catch((err) => {
      next(err);
    })

})

module.exports = router;
