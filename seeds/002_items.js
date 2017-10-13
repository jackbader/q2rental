
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        
      ])
      .then(() => {
        return knex.raw("SELECT setval('items_id_seq',(SELECT MAX(id) FROM items));")
      })
    });
};
