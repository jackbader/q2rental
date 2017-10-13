
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, title: 'blue bike', desc: 'super dope', img_url: 'https://images-na.ssl-images-amazon.com/images/I/81384mxg5xL._SX355_.jpg', cat: 'Bikes and boards', owner_id: 1, rented: false, daily_price: 10},
        {id: 2, title: 'red lawnmower', desc: 'works pretty well', img_url: 'https://mobileimages.lowes.com/product/converted/043033/043033565955.jpg', cat: 'Lawn and Garden', owner_id: 2, rented: true, daily_price: 15},
        {id: 3, title: 'blue guitar', desc: 'it shreds', img_url: 'https://www.guitar.co.uk/media/catalog/product/cache/1/image/800x400/9df78eab33525d08d6e5fb8d27136e95/r/e/reverend-jetstream-hb-superior-blue.jpg', cat: 'Electronics', owner_id: 3, rented: false, daily_price: 20},
      ])
      .then(() => {
        return knex.raw("SELECT setval('items_id_seq',(SELECT MAX(id) FROM items));")
      })
    });
};
